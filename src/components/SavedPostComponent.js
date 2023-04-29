import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { gql, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";
import { StatusBar } from "react-native";
import FocusedStatusBar from "./FocusedStatusBar";

const RemoveLikedPostMutation = gql`
  mutation removeLike($userId: uuid!, $postId: uuid!) {
    delete_LikedPost(
      where: { userId: { _eq: $userId }, _and: { postId: { _eq: $postId } } }
    ) {
      returning {
        id
        postId
        userId
        Post {
          user {
            displayName
          }
        }
      }
    }
  }
`;

const SavedPostComponent = ({ data }) => {
  const navigation = useNavigation();
  const width = useWindowDimensions().width;

  const [postData, setPostData] = useState(data);
  const [liked, setLiked] = useState(false);
  const id = postData?.Post?.id;
  const userId = useUserId();

  const [deleteLike] = useMutation(RemoveLikedPostMutation);

  // console.log(postData?.Post?.id);

  useEffect(() => {
    if (postData?.LikedPost?.userId.toString().includes(userId)) {
      setLiked(postData?.LikedPost?.liked);
    }
  }, [postData]);

  useEffect(() => {
    async function checkIfLiked() {
      setLiked(postData?.LikedPost?.userId.toString().includes(userId));
    }

    checkIfLiked();
  }, []);

  const onDislikePressed = async () => {
    // console.warn("paspaudziau like");
    await deleteLike({ variables: { userId: userId, postId: id } });
  };

  const toDetails = () => {
    navigation.navigate("Details", { postId: postData?.Post?.id });
  };

  return (
    <View style={[styles.container, { width: width }]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={onDislikePressed}
          style={{
            width: 30,
            height: 30,
            // backgroundColor: COLORS.white,
            position: "absolute",
            borderRadius: SIZES.extraLarge,
            alignItems: "center",
            justifyContent: "center",
            // ...SHADOWS.light,
            top: 10,
            right: 10,
            zIndex: 1,
          }}
        >
          <AntDesign
            name={liked ? "hearto" : "heart"}
            size={22}
            color={liked ? "gray" : "#00AEEF"}
          />
        </TouchableOpacity>
        {/* Image */}
        <Pressable onPress={toDetails}>
          <Image style={styles.image} source={{ uri: postData?.Post?.image }} />
        </Pressable>

        <View style={styles.rowContainer}>
          <View
            style={{
              marginHorizontal: 10,
              width: 200,
            }}
          >
            {/* Bed & Bedroom */}
            <Text style={styles.title} numberOfLines={2}>
              {postData?.Post?.title}
            </Text>

            {/* Type & Description */}
            <Text style={styles.city} numberOfLines={2}>
              {postData?.Post?.city}
            </Text>

            <Text style={styles.newPrice}>{postData?.Post?.price}eur/val</Text>
          </View>
        </View>
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
  title: {
    marginVertical: 10,
    color: COLORS.dark_gray,
    fontWeight: "700",
    fontSize: SIZES.small,
  },
  city: {
    fontSize: 15,
    color: "#BEBEBE",
  },
  newPrice: {
    fontWeight: "500",
    color: "#00AEEF",
  },
  totalPrice: {
    color: "#5b5b5b",
    textDecorationLine: "underline",
  },
  rowContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
});

export default SavedPostComponent;
