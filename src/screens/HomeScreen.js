import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FocusedStatusBar, HomeHeader, PostCard } from "../components";
import { COLORS, dummyPosts, SHADOWS, SIZES } from "../constants";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery, useSubscription } from "@apollo/client";

const GET_ALL_POSTS_INFO = gql`
  query {
    Post(order_by: { date: desc }) {
      city
      date
      id
      title
      image
      price
      description
      userId
      LikedPost {
        id
        postId
        userId
        liked
      }
    }
  }
`;

const HomeScreen = () => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_POSTS_INFO);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // if (data) {
  //   setPosts(data?.Post);
  // }

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Problema su serveriu", error.message);
  }

  // console.log(posts?.Post?.title);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredPosts = posts?.Post?.filter((post) =>
    post.title.toLowerCase().includes(searchValue)
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />

      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostCard data={item} />}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>
      </View>

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

export default HomeScreen;
