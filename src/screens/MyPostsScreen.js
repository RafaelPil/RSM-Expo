import { ActivityIndicator, Alert, FlatList, SafeAreaView } from "react-native";
import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { dummyPosts } from "../constants";
import MyPostComponent from "../components/MyPostComponent";
import { gql, useSubscription } from "@apollo/client";
import { useUserId } from "@nhost/react";

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
  // const [data, setData] = useState(dummyPosts);
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
        renderItem={({ item }) => <MyPostComponent data={item} />}
        ListHeaderComponent={<HeaderComponent headerTitle={"Mano skelbimai"} />}
      />
    </SafeAreaView>
  );
};

export default MyPostsScreen;
