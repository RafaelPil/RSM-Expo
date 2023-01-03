import { FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { dummyPosts } from "../constants";
import SavedPostComponent from "../components/SavedPostComponent";
import HeaderComponent from "../components/HeaderComponent";
import { gql, useQuery } from "@apollo/client";
import { useUserId } from "@nhost/react";

const GET_ALL_POSTS_INFO = gql`
  query getPostByUserId($userId: uuid!) {
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
  const { data, loading, error } = useQuery(GET_ALL_POSTS_INFO, {
    variables: { userId: userId },
  });

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
