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
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

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
      <FlatList
        data={data?.LikedPost}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SavedPostComponent data={item} />}
        ListHeaderComponent={
          <HeaderComponent headerTitle={"Įsiminti seklbimai"} />
        }
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

export default SavedPostScreen;
