import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { COLORS, dummyPosts, SHADOWS } from "../constants";
import MyPostComponent from "../components/MyPostComponent";
import { gql, useSubscription } from "@apollo/client";
import { useUserId } from "@nhost/react";
import { useNavigation } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";

const GET_MY_POSTS = gql`
  subscription getMyUploadedPostsByUserId($userId: uuid!) {
    Post(where: { userId: { _eq: $userId } }) {
      city
      date
      description
      id
      image
      price
      title
      userId
      LikedPost {
        id
        liked
        postId
        userId
      }
    }
  }
`;

const MyPostsScreen = () => {
  const navigation = useNavigation();
  const userId = useUserId();

  const { data, loading, error } = useSubscription(GET_MY_POSTS, {
    variables: { userId: userId },
  });

  // console.log(data?.Post);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Problema su serveriu", error.message);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data?.Post}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MyPostComponent postData={item} />}
        ListHeaderComponent={<HeaderComponent headerTitle={"Mano skelbimai"} />}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Chats")}
        style={styles.chatContainer}
      >
        <View style={styles.chatInContainer}>
          <Entypo name="chat" size={24} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    position: "absolute",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.light,
    right: 10,
    bottom: 10,
    borderWidth: 3,
    borderColor: COLORS.gray,
  },
  chatInContainer: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.light,
  },
});

export default MyPostsScreen;
