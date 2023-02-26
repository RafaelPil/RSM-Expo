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
          backgroundColor: COLORS.primary,
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
            source={assets.logoexmpl}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: "white" }}
          />

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={26} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: SIZES.font }}>
          <Text
            style={{
              fontSize: SIZES.large,
              color: COLORS.white,
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
