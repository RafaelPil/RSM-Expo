import { View, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SHADOWS, SIZES, assets } from "../constants";
import { PostTitle } from "./PostInfo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { gql, useMutation, useSubscription } from "@apollo/client";
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

const GET_LIKED_POST_SUBSCR = gql`
  subscription ($postId: uuid!) {
    LikedPost(where: { postId: { _eq: $postId } }) {
      id
      postId
      userId
      liked
    }
  }
`;

const PostCard = (props) => {
  const data = props.data;
  const [postData, setPostData] = useState([]);
  const [liked, setLiked] = useState(false);

  const navigation = useNavigation();
  const id = data?.id;
  const userId = useUserId();

  const [likePost] = useMutation(LikePostMutation);
  const [deleteLike] = useMutation(RemoveLikedPostMutation);
  const { data: subscriptionData } = useSubscription(GET_LIKED_POST_SUBSCR, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (postData?.LikedPost?.userId === userId) {
      setLiked(postData?.LikedPost?.liked === true);
    }
  }, [postData]);

  useEffect(() => {
    setLiked(
      subscriptionData?.LikedPost?.some((liked) => liked.userId === userId)
    );
  }, [subscriptionData, userId]);

  useEffect(() => {
    async function checkIfLiked() {
      setLiked(data?.LikedPost?.userId.toString().includes(userId));
    }

    checkIfLiked();
  }, []);

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
    navigation.navigate("Details", {
      postId: data?.id,
    });
  };

  //console.log(data);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.large,
        ...SHADOWS.dark,
      }}
    >
      <Pressable onPress={toDetails} style={{ width: "100%", height: 200 }}>
        <Image
          source={{ uri: data?.image }}
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
          width: 35,
          height: 35,
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
        <AntDesign
          name={liked ? "heart" : "hearto"}
          size={24}
          color={liked ? "#00AEEF" : "grey"}
        />
      </TouchableOpacity>

      <View style={{ width: "100%", padding: SIZES.font }}>
        <PostTitle title={data?.title} price={data?.price} city={data?.city} />
      </View>
    </View>
  );
};

export default PostCard;
