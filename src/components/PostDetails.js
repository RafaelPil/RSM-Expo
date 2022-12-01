import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";

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
import { useUserData } from "@nhost/react";

const PostDetailsHeader = ({ post }) => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState(post);

  return (
    <View style={{ width: "100%", height: 373 }}>
      <Image
        source={{ uri: postData.image }}
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
        onPress={() => console.log("heart manin")}
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
        <AntDesign name="hearto" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const PostDetails = ({ post }) => {
  const [postData, setPostData] = useState(post);
  //const id = postData.id;
  console.log(postData.user.metadata.phone);
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
          tel={`+370 ${postData.user.metadata.phone}`}
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
          title={postData.title}
          price={postData.price}
          city={postData.city}
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
          {postData.description}
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
