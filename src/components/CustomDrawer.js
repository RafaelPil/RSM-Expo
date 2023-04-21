import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { assets, COLORS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import {
  useSignOut,
  useAuthenticated,
  useUserDisplayName,
  useUserData,
} from "@nhost/react";
import { StyleSheet } from "react-native";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { signOut } = useSignOut();
  const isAuthenticated = useAuthenticated();
  const userName = useUserDisplayName();
  const user = useUserData();

  const logout = async () => {
    await signOut();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{ backgroundColor: COLORS.primary }}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
          <Text style={styles.name}>{user?.displayName}</Text>
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
    marginHorizontal: 8,
  },
  avatarText: {
    color: "#474747",
    fontSize: SIZES.font,
    textAlign: "left",
  },
});

export default CustomDrawer;
