import React from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  View,
  Text,
  SafeAreaView,
} from "react-native";

import { useUserData, useSignOut, useAuthenticated } from "@nhost/react";
import HeaderComponent from "../components/HeaderComponent";

export default function TabTwoScreen() {
  const user = useUserData();
  const { signOut } = useSignOut();
  const isAuthenticated = useAuthenticated();

  console.log(user);
  const logout = async () => {
    await signOut();
  };

  if (isAuthenticated) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent headerTitle={"Profilis"} />
        <View style={styles.container}>
          <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>{user?.displayName}</Text>
          <View style={{ marginTop: "auto" }}>
            <Pressable onPress={() => signOut()}>
              <Text>Atsijungti</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Ne Autorizuotas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
