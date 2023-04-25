import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { assets, COLORS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSignOut, useUserData, useUserId } from "@nhost/react";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import { Alert } from "react-native";

const GET_USER_INFO = gql`
  subscription getUser($id: uuid!) {
    user(id: $id) {
      avatarUrl
      displayName
    }
  }
`;

const CustomDrawer = (props) => {
  const { signOut } = useSignOut();
  const user = useUserData();
  const userId = useUserId();

  const { data, loading, error } = useSubscription(GET_USER_INFO, {
    variables: { id: userId },
  });
  console.log(data?.user?.displayName);

  const [userAvatar, setUserAvatar] = useState(data?.user?.avatarUrl);
  const [userName, setUserName] = useState(data?.user?.displayName);

  console.log(data?.user);

  useEffect(() => {
    setUserAvatar(data?.user?.avatarUrl);
    setUserName(data?.user?.displayName);
  }, [data]);

  const logout = async () => {
    await signOut();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    Alert.alert("Serverio klaida", error.message);
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{ backgroundColor: COLORS.primary }}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
          <Text style={styles.name}>{userName}</Text>
        </View>

        <View
          style={{ flex: 1, backgroundColor: COLORS.white, paddingTop: 10 }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={logout}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="logout" size={22} />
            <Text style={{ fontSize: SIZES.font, marginLeft: 5 }}>
              Atsijungti
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 20,
    justifyContent: "flex-start",
    flex: 1,
  },
  avatar: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: "700",
    fontSize: 17,
    marginVertical: 15,
    color: "#474747",
    lineHeight: 17,
    marginHorizontal: 2,
  },
  avatarText: {
    color: "#474747",
    fontSize: SIZES.font,
    textAlign: "center",
  },
});

export default CustomDrawer;
