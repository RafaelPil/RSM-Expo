import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { COLORS, SIZES, assets } from "../constants";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import FIlterSearch from "../modals/FIlterSearch";
import { useUserDisplayName } from "@nhost/react";

const HomeHeader = ({ onSearch }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();

  const userName = useUserDisplayName();

  return (
    <SafeAreaView
      style={{
        padding: SIZES.large,
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
          Labas, {userName} 👋
        </Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <View
          style={{
            width: "100%",
            borderRadius: 20,
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.small,
            paddingVertical: 6,
            borderWidth: 1,
            borderColor: "#F5F5F5",
            height: 45,
          }}
        >
          <AntDesign
            name="search1"
            size={20}
            color="#BEBEBE"
            style={{
              marginRight: SIZES.base,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <TextInput
            placeholder="Rask savo mokytoja"
            placeholderTextColor="#BEBEBE"
            style={{
              color: "#474747",
              fontSize: SIZES.font,
              textDecorationLine: "none",
            }}
            onChangeText={onSearch}
          />
          {/* <FontAwesome
            name="sliders"
            size={20}
            color={COLORS.white}
            style={{
              marginRight: SIZES.base,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setOpenModal(true)}
          /> */}

          {/* <FIlterSearch openModal={openModal} setOpenModal={setOpenModal} /> */}
        </View>
      </View>
      {/* <TouchableOpacity onPress={onRefresh}>
        <Text>Refresh</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeHeader;
