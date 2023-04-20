import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { Entypo } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { gql, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";

const MUTATION_DELETE_POST = gql`
  mutation deletePost($postId: uuid!, $userId: uuid!) {
    delete_Post(
      where: { id: { _eq: $postId }, _and: { userId: { _eq: $userId } } }
    ) {
      returning {
        id
        userId
      }
    }
  }
`;

const MUTATION_EDIT_POST = gql`
  mutation editPost(
    $postId: uuid!
    $userId: uuid!
    $city: String!
    $description: String!
    $image: String!
    $price: String!
    $title: String!
  ) {
    update_Post(
      _set: {
        city: $city
        description: $description
        image: $image
        price: $price
        title: $title
      }
      where: { id: { _eq: $postId }, _and: { userId: { _eq: $userId } } }
    ) {
      returning {
        id
        city
        date
        description
        image
        price
        userId
        title
      }
    }
  }
`;

const MyPostComponent = ({ postData }) => {
  const navigation = useNavigation();
  const width = useWindowDimensions().width;
  const id = postData.id;
  const userId = useUserId();

  const [deletePost] = useMutation(MUTATION_DELETE_POST, {
    variables: { postId: id, userId: userId },
  });

  const onDeletePost = async () => {
    await deletePost({ variables: { userId: userId, postId: id } });
  };

  const toDetails = () => {
    navigation.navigate("Details", { postId: id });
  };

  return (
    <View style={[styles.container, { width: width }]}>
      <View style={styles.innerContainer}>
        {/* Image */}
        <Pressable onPress={toDetails}>
          <Image style={styles.image} source={{ uri: postData.image }} />
        </Pressable>

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          {/* Bed & Bedroom */}
          <Text style={styles.bedrooms}>{postData.description}</Text>

          {/* Type & Description */}
          <Text style={styles.description} numberOfLines={2}>
            {postData.city}
          </Text>

          <Text style={styles.newPrice}>€{postData.price}</Text>
        </View>

        {/* Menu */}
        <Menu>
          <MenuTrigger
            style={{
              borderRadius: SIZES.extraLarge,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              onSelect={() =>
                navigation.navigate("EditPost", { postData: postData })
              }
              text="Redaguoti"
            />
            <MenuOption onSelect={onDeletePost}>
              <Text style={{ color: "red" }}>Pašalinti</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: SIZES.small,
  },
  innerContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
  bedrooms: {
    marginVertical: 10,
    color: "#5b5b5b",
  },
  description: {
    fontSize: 15,
  },
  newPrice: {
    fontWeight: "bold",
    color: "black",
  },
  totalPrice: {
    color: "#5b5b5b",
    textDecorationLine: "underline",
  },
});

export default MyPostComponent;
