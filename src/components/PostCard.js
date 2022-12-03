import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SHADOWS, SIZES, assets } from "../constants";
import {
  PostCity,
  PostTitle,
  PostImg,
  PostPrice,
  ImageProfileLiked,
  LikedPeople,
} from "./PostInfo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { gql, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";

const LikePostMutation = gql`
  mutation PutLikeToPost($postId: uuid!, $userId: uuid!) {
    insert_LikedPost(objects: [{ postId: $postId, userId: $userId }]) {
      returning {
        id
        postId
        userId
        Post {
          id
          LikedPost {
            id
          }
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
  const navigation = useNavigation();

  const [data, setData] = useState(props.data);
  const [isLiked, setIsLiked] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const id = data.id;

  const onLikePress = () => {
    if (isLiked.includes(id) && likeState === true) {
      setIsLiked((prev) => prev.filter((_id) => _id !== id));
      setLikeState(false);
    } else {
      setIsLiked((prev) => [...prev, id]);
      setLikeState(true);
    }
  };

  const toDetails = () => {
    navigation.navigate("Details", { postId: data.id });
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
          source={{ uri: data.image }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
      </Pressable>

      <Pressable
        style={{ marginTop: -30 }}
        onPress={() => navigation.navigate("UsersModal", { id: data.id })}
      >
        <LikedPeople />
      </Pressable>

      <TouchableOpacity
        onPress={onLikePress}
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
        <AntDesign name="hearto" size={24} color={likeState ? "red" : "grey"} />
      </TouchableOpacity>

      <View style={{ width: "100%", padding: SIZES.font }}>
        <PostTitle title={data.title} price={data.price} city={data.city} />
      </View>
    </View>
  );
};

export default PostCard;
