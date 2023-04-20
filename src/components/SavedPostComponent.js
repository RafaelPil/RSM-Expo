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
import AntDesign from "react-native-vector-icons/AntDesign";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { gql, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";

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

  const onLikePressed = async () => {
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
          onPress={onLikePressed}
          style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.white,
            position: "absolute",
            borderRadius: SIZES.extraLarge,
            alignItems: "center",
            justifyContent: "center",
            ...SHADOWS.light,
            top: 10,
            right: 10,
          }}
        >
          <AntDesign name="hearto" size={24} color={!liked ? "red" : "grey"} />
        </TouchableOpacity>
        {/* Image */}
        <Pressable onPress={toDetails}>
          <Image style={styles.image} source={{ uri: postData?.Post?.image }} />
        </Pressable>

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          {/* Bed & Bedroom */}
          <Text style={styles.bedrooms}>{postData?.Post?.description}</Text>

          {/* Type & Description */}
          <Text style={styles.description} numberOfLines={2}>
            {postData?.Post?.city}
          </Text>

          <Text style={styles.newPrice}>€{postData?.Post?.price}</Text>
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

export default SavedPostComponent;
