import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { COLORS, SIZES, assets, SHADOWS } from "../constants";
import { FocusedStatusBar, CircleButton } from "../components";
import { useNavigation } from "@react-navigation/native";
import { PostTitle } from "../components";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useUserData, useUserId } from "@nhost/react";
import { ChatContext } from "../../context/ChatContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from "react-native";

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

const PostDetailsHeader = ({ post }) => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState(post);
  const [liked, setLiked] = useState(false);

  const id = postData?.id;
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
      setLiked(id?.LikedPost?.userId.toString().includes(userId));
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

  return (
    <View style={{ width: "100%", height: 373 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="#00AEEF"
        transLucent={true}
      />
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
          name={liked ? "heart" : "hearto"}
          size={24}
          color={liked ? "#00AEEF" : "grey"}
        />
      </TouchableOpacity>
    </View>
  );
};

const PostDetails = ({ post }) => {
  const [postData, setPostData] = useState(post);
  //console.log(postData.user.metadata.phone);
  const navigation = useNavigation();
  const user = useUserData();

  const postUserId = postData?.userId.toString();
  const postTitle = post?.title;
  //console.log(post?.title);
  const { startDMChatRoom } = useContext(ChatContext);

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
          paddingVertical: SIZES.large,
          right: 15,
          left: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <RectButton
          minWidth={170}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
          tel={`+370 ${postData?.user?.metadata.phone}`}
        /> */}
        <Pressable
          style={styles.rezervationButton}
          onPress={() =>
            navigation.navigate("Booking", {
              postUserId: postUserId,
              postTitle: postTitle,
            })
          }
        >
          <Text style={styles.rezervationBtnText}>Rezervuoti</Text>
        </Pressable>
        <Pressable
          style={styles.chatButton}
          onPress={() => startDMChatRoom(postUserId)}
        >
          <Text style={styles.chatButtonText}>Pokalbis</Text>
        </Pressable>
      </View>

      <PostDetailsHeader post={postData} />

      {/* <Pressable
        style={{ marginTop: -30 }}
        onPress={() => navigation.navigate("UsersModal", { id: postData.id })}
      >
        <LikedPeople />
      </Pressable> */}

      <View>
        <View style={{ padding: SIZES.large }}>
          <View style={{ alignContent: "center" }}>
            <View style={styles.row}>
              <Text
                style={{
                  fontSize: SIZES.large,
                  color: "#474747",
                  fontWeight: "700",
                }}
              >
                {postData?.title}
              </Text>

              <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
            </View>

            <Text
              style={{
                fontSize: SIZES.font,
                color: "#BEBEBE",
              }}
            >
              {postData?.city}
            </Text>
            <Text
              style={{
                fontSize: SIZES.medium,
                color: "#00AEEF",
                fontWeight: "bold",
                marginTop: 15,
              }}
            >
              {postData?.price}€/val
            </Text>
          </View>
        </View>

        <View
          style={{
            padding: SIZES.font,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.large,
              fontWeight: "500",
              color: "#474747",
            }}
          >
            Aprašymas
          </Text>
          <View style={{ marginTop: SIZES.base }}></View>
          <Text
            style={{
              fontSize: SIZES.small,
              color: "#474747",
              lineHeight: SIZES.small,
              fontWeight: "400",
            }}
          >
            {postData?.description}
          </Text>
        </View>
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
  chatButton: {
    backgroundColor: "#fff",
    borderRadius: SIZES.extraLarge,
    minWidth: 150,
    padding: SIZES.small,
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },
  rezervationButton: {
    backgroundColor: "#00AEEF",
    borderRadius: SIZES.extraLarge,
    minWidth: 150,
    padding: SIZES.small,
  },
  chatButtonText: {
    fontSize: SIZES.font,
    color: "#474747",
    textAlign: "center",
    fontWeight: "500",
  },
  rezervationBtnText: {
    fontSize: SIZES.font,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
  avatarContainer: {
    padding: 10,
  },
  avatar: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 50,
  },
});

export default PostDetails;
