import React, { useEffect } from "react";

import PostDetails from "../components/PostDetails";
import { useRoute } from "@react-navigation/native";
import { gql, useSubscription, useQuery } from "@apollo/client";
import { ActivityIndicator, Alert } from "react-native";

const GetPostById = gql`
  query getPost($id: uuid!) {
    Post_by_pk(id: $id) {
      city
      date
      id
      title
      image
      price
      description
      userId
      user {
        displayName
      }
      LikedPost {
        id
        postId
        userId
        liked
      }
    }
  }
`;

const DetailsScreen = () => {
  const route = useRoute();
  const id = route?.params?.postId;
  // console.log(id);
  //const post = dummyPosts.find((p) => p.id === route.params.postId);

  const { data, loading, error } = useQuery(GetPostById, {
    variables: { id: id },
  });

  const post = data?.Post_by_pk;

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Serverio klaida", error.message);
  }

  // console.log(post.user);

  return <PostDetails post={post} />;
};

export default DetailsScreen;
