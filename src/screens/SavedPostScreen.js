import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, dummyPosts, SHADOWS } from "../constants";
import SavedPostComponent from "../components/SavedPostComponent";
import HeaderComponent from "../components/HeaderComponent";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useUserId } from "@nhost/react";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FocusedStatusBar } from "../components";

const GET_ALL_POSTS_INFO = gql`
  subscription getSavedPostByUserId($userId: uuid!) {
    LikedPost(where: { userId: { _eq: $userId } }) {
      id
      postId
      userId
      liked
      Post {
        city
        date
        id
        image
        title
        userId
        price
        description
      }
    }
  }
`;

const SavedPostScreen = ({ isLiked }) => {
  const navigation = useNavigation();
  const userId = useUserId();
  const { data, loading, error } = useSubscription(GET_ALL_POSTS_INFO, {
    variables: { userId: userId },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Serverio klaida", error.message);
  }

  const handleRefresh = async () => {
    console.warn("refetch");
    await refetch();
  };

  // useEffect(() => {}, [data]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="#00AEEF"
        transLucent={true}
      />
      <FlatList
        data={data?.LikedPost}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SavedPostComponent data={item} />}
        ListHeaderComponent={
          <HeaderComponent headerTitle={"Įsimintos paslaugos"} />
        }
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Chats")}
        style={styles.chatContainer}
      >
        <View style={styles.chatInContainer}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={34}
            color={COLORS.white}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    width: 60,
    height: 60,
    // backgroundColor: "#00AEEF",
    position: "absolute",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    // ...SHADOWS.light,
    right: 10,
    bottom: 10,
    // borderWidth: 3,
    // borderColor: "#00AEEF",
  },
  chatInContainer: {
    backgroundColor: "#00AEEF",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.light,
  },
});

export default SavedPostScreen;
