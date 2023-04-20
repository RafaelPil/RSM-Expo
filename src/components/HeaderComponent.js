import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { assets, COLORS, SIZES } from "../constants";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const HeaderComponent = (props) => {
  const headerTitle = props.headerTitle;
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: SIZES.font,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/logo.png")}
            resizeMode="contain"
            style={{ width: 45, height: 45 }}
          />

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={26} color="#474747" />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: SIZES.font }}>
          <Text
            style={{
              fontSize: SIZES.large,
              color: "#474747",
              fontWeight: "bold",
            }}
          >
            {headerTitle}
          </Text>
        </View>
      </View>
    </>
  );
};

export default HeaderComponent;
