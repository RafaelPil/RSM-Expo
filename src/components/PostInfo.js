import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS, dummyData, SIZES, assets, dummyPosts } from "../constants";
import { FONTS } from "../constants/theme";

const displayedUsers = (dummyPosts || []).slice(0, 5).map((attende) => attende);

export const PostTitle = ({ title, price, city }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: SIZES.large,
          color: "#474747",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: SIZES.font,
          color: "#BEBEBE",
        }}
      >
        {city}
      </Text>
      <Text
        style={{
          fontSize: SIZES.medium,
          color: "#00AEEF",
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        {price}€/val
      </Text>
    </View>
  );
};

export const PostPrice = () => {
  return (
    <View>
      <Text>SubInfo</Text>
    </View>
  );
};

export const PostCity = () => {
  return (
    <View>
      <Text>SubInfo</Text>
    </View>
  );
};

export const ImageProfileLiked = ({ imgUrl, index }) => {
  return (
    <Image
      source={imgUrl}
      resizeMode="contain"
      style={[styles.userAvatar, { transform: [{ translateX: -15 * index }] }]}
    />
  );
};

export const LikedPeople = () => {
  return (
    <View style={styles.footer}>
      {/* User avatars */}
      <View style={styles.users}>
        {displayedUsers.map((user, index) => (
          <Image
            key={user.id}
            source={{ uri: user.img }}
            style={[
              styles.userAvatar,
              { transform: [{ translateX: -15 * index }] },
            ]}
          />
        ))}
        <View
          style={[
            styles.userAvatar,
            { transform: [{ translateX: -15 * displayedUsers.length }] },
          ]}
        >
          <Text>+{dummyPosts.length - displayedUsers.length}</Text>
        </View>
      </View>

      {/* {!joined ? (
        <CustomButton text="Join the event" onPress={() => {}} />
      ) : (
        <CustomButton
          text="Join the conversation"
          type="SECONDARY"
          onPress={() => {}}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  time: {
    fontSize: 20,
  },
  footer: {
    marginTop: "auto",
  },
  users: {
    flexDirection: "row",
  },
  userAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "gainsboro",
    justifyContent: "center",
    alignItems: "center",
  },
});
