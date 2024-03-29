import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES, dummyPosts } from "../constants";
import FocusedStatusBar from "../components/FocusedStatusBar";

const displayedUsers = (dummyPosts || []).slice(0, 5).map((attende) => attende);

export const PostTitle = ({ title, price, city }) => {
  return (
    <View style={{ alignContent: "center" }}>
      <View style={styles.row}>
        <Text
          style={{
            fontSize: SIZES.font,
            color: "#474747",
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
      </View>

      <Text
        style={{
          fontSize: SIZES.small,
          color: "#BEBEBE",
          marginTop: 3,
        }}
      >
        {city}
      </Text>
      <Text
        style={{
          fontSize: SIZES.medium,
          color: COLORS.primary,
          fontWeight: "500",
          marginTop: 15,
        }}
      >
        {price}eur/val
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 15,
    color: "#000",
  },
});
