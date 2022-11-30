import React from "react";
import { StyleSheet, Image, Pressable, View, Text } from "react-native";

import { useUserData, useSignOut } from "@nhost/react";

//const user = users[0];

export default function TabTwoScreen() {
  const user = useUserData();
  //console.log(JSON.stringify(user, null, 2));
  const { signOut } = useSignOut();

  console.log(user);

  const logout = async () => {
    await signOut();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{user?.displayName}</Text>
      <View style={{ marginTop: "auto" }}>
        <Pressable onPress={logout}>
          <Text>Atsijungti</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
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
    color: "dimgray",
  },
});
