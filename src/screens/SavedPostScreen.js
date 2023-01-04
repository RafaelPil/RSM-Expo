import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { dummyPosts } from "../constants";
import SavedPostComponent from "../components/SavedPostComponent";
import HeaderComponent from "../components/HeaderComponent";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useUserId } from "@nhost/react";

const GET_ALL_POSTS_INFO = gql`
  subscription getPostByUserId($userId: uuid!) {
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
    </SafeAreaView>
  );
};

export default SavedPostScreen;
