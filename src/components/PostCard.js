import { View, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SHADOWS, SIZES, assets } from "../constants";
import { PostTitle } from "./PostInfo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { gql, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";

const LikePostMutation = gql`
  mutation PutLikeToPost($postId: uuid!, $userId: uuid!, $liked: Boolean!) {
    insert_LikedPost(
      objects: [{ postId: $postId, userId: $userId, liked: $liked }]
    ) {
      returning {
        id
        postId
        userId
        liked
        Post {
          id
        }
      }
    }
  }
`;

const RemoveLikedPostMutation = gql`
  mutation removeLike($userId: uuid!, $postId: uuid!) {
    delete_LikedPost(
      where: { userId: { _eq: $userId }, _and: { postId: { _eq: $postId } } }
    ) {
      returning {
        id
        postId
        userId
        Post {
          user {
            displayName
          }
        }
      }
    }
  }
`;

const PostCard = (props) => {
  const data = props.data;
  const [postData, setPostData] = useState([]);
  const [liked, setLiked] = useState(false);

  const navigation = useNavigation();
  const id = postData?.id;
  const userId = useUserId();

  const [likePost] = useMutation(LikePostMutation);
  const [deleteLike] = useMutation(RemoveLikedPostMutation);

  useEffect(() => {
    if (data) {
      setPostData(data);
    }
  }, [data]);

  // console.log(postData?.LikedPost?.userId);

  useEffect(() => {
    if (
      postData &&
      postData?.LikedPost &&
      postData?.LikedPost?.userId.toString().includes(userId)
    ) {
      setLiked(postData.LikedPost.liked === true);
    }
  }, [postData, userId]);

  useEffect(() => {
    async function checkIfLiked() {
      setLiked(postData?.LikedPost?.userId.toString().includes(userId));
    }

    checkIfLiked();
  }, [postData, userId]);

  const onLikePressed = async () => {
    // console.warn("paspaudziau like");
    if (!liked) {
      await likePost({
        variables: { postId: id, userId: userId, liked: true },
      });
    } else {
      await deleteLike({ variables: { userId: userId, postId: id } });
    }
    setLiked(!liked);
  };

  const toDetails = () => {
    navigation.navigate("Details", { postId: postData.id });
  };

  //console.log(data);

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}
    >
      <Pressable onPress={toDetails} style={{ width: "100%", height: 250 }}>
        <Image
          source={{ uri: postData.image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
      </Pressable>

      {/* <Pressable
        style={{ marginTop: -30 }}
        onPress={() => navigation.navigate("UsersModal", { id: data.id })}
      >
        <LikedPeople />
      </Pressable> */}

      <TouchableOpacity
        onPress={onLikePressed}
        style={{
          width: 40,
          height: 40,
          backgroundColor: COLORS.white,
          position: "absolute",
          borderRadius: SIZES.extraLarge,
          alignItems: "center",
          justifyContent: "center",
          ...SHADOWS.light,
          top: 10,
          right: 10,
        }}
      >
        <AntDesign name="hearto" size={24} color={liked ? "red" : "grey"} />
      </TouchableOpacity>

      <View style={{ width: "100%", padding: SIZES.font }}>
        <PostTitle
          title={postData.title}
          price={postData.price}
          city={postData.city}
        />
      </View>
    </View>
  );
};

export default PostCard;
