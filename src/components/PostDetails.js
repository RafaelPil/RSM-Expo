import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { COLORS, SHADOWS, SIZES, assets } from "../constants";
import {
  FocusedStatusBar,
  RectButton,
  ChatButton,
  CircleButton,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import { PostTitle } from "../components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LikedPeople } from "./PostInfo";
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

const UPDATE_LIKE_STATE = gql`
  mutation CHANGE_LIKE_STATE(
    $id: uuid!
    $postId: uuid!
    $userId: uuid!
    $liked: Boolean!
  ) {
    update_LikedPost_by_pk(
      pk_columns: { id: $id }
      _set: { liked: $liked, userId: $userId, postId: $postId }
    ) {
      id
      liked
      postId
      liked
      userId
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

const PostDetailsHeader = ({ post }) => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState(post);
  const [isLiked, setIsLiked] = useState([]);
  const [likeState, setLikeState] = useState(postData?.LikedPost?.liked);

  const id = postData?.id;
  const userId = useUserId();
  const likedPostId = post.LikedPost.id;
  console.log(post.LikedPost.id);

  const [doJoinLike] = useMutation(LikePostMutation);
  const [removeJoinedLike] = useMutation(RemoveLikedPostMutation);
  const [CHANGE_LIKE_STATE] = useMutation(UPDATE_LIKE_STATE);

  const onLikePressed = async () => {
    try {
      if (
        postData?.LikedPost?.userId !== userId &&
        postData?.LikedPost?.postId !== id
      ) {
        await doJoinLike({
          variables: { userId: userId, postId: id, liked: true },
        });
        // await CHANGE_LIKE_STATE({
        //   variables: {
        //     id: likedPostId,
        //     userId: userId,
        //     postId: id,
        //     liked: true,
        //   },
        // });
      }
      if (
        postData?.LikedPost?.userId === userId &&
        postData?.LikedPost?.postId === id &&
        postData?.LikedPost?.liked === true
      ) {
        await CHANGE_LIKE_STATE({
          variables: {
            id: likedPostId,
            userId: userId,
            postId: id,
            liked: false,
          },
        });
        // await removeJoinedLike({
        //   variables: { userId: userId, postId: id },
        // });
      }
    } catch (e) {
      Alert.alert("Klaida", e.message);
    }
  };

  return (
    <View style={{ width: "100%", height: 373 }}>
      <Image
        source={{ uri: postData?.image }}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={StatusBar.currentHeight + 10}
      />

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
          top: StatusBar.currentHeight + 10,
          right: 10,
        }}
      >
        <AntDesign
          name="hearto"
          size={24}
          color={postData?.LikedPost?.liked === true ? "red" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );
};

const PostDetails = ({ post }) => {
  const [postData, setPostData] = useState(post);
  //console.log(postData.user.metadata.phone);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        transLucent={true}
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingVertical: SIZES.font,
          right: 10,
          left: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RectButton
          minWidth={170}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
          tel={`+370 ${postData?.user?.metadata.phone}`}
        />
        <ChatButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>

      <PostDetailsHeader post={postData} />

      <Pressable
        style={{ marginTop: -30 }}
        onPress={() => navigation.navigate("UsersModal", { id: postData.id })}
      >
        <LikedPeople />
      </Pressable>

      <View style={{ padding: SIZES.font }}>
        <PostTitle
          title={postData?.title}
          price={postData?.price}
          city={postData?.city}
        />
      </View>

      <View style={{ padding: SIZES.font }}>
        <Text
          style={{
            fontSize: SIZES.large,
            fontWeight: "bold",
            color: COLORS.primary,
          }}
        >
          Aprašymas
        </Text>
        <View style={{ marginTop: SIZES.base }}></View>
        <Text
          style={{
            fontSize: SIZES.small,
            color: COLORS.secondary,
            lineHeight: SIZES.large,
          }}
        >
          {postData?.description}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  time: {
    fontSize: 20,
  },
  footer: {
    marginTop: "auto",
  },
  users: {
    flexDirection: "row",
  },
  userAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "gainsboro",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetails;
