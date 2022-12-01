import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { assets, dummyPosts } from "../constants";

const UsersListItem = ({ user }) => {
  return (
    <Pressable style={styles.container}>
      <Image source={{ uri: user.img }} style={styles.image} />
      <Text style={styles.name}>{user.vardas}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default UsersListItem;
