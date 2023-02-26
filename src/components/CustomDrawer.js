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
import { useSignOut, useAuthenticated } from "@nhost/react";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { signOut } = useSignOut();
  const isAuthenticated = useAuthenticated();

  const logout = async () => {
    await signOut();
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: COLORS.primary }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={assets.logoexmpl}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
              tintColor: "white",
              marginBottom: 10,
            }}
          />
          <Text style={{ color: COLORS.white, fontSize: SIZES.font }}>
            Name
          </Text>
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

export default CustomDrawer;
