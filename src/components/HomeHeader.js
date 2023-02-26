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

const HomeHeader = ({ onSearch, onRefresh }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();

  const userName = useUserDisplayName();

  return (
    <SafeAreaView
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
          Labas, {userName} 👋
        </Text>
      </View>

      <View style={{ marginVertical: SIZES.font }}>
        <View
          style={{
            width: "100%",
            borderRadius: SIZES.font,
            backgroundColor: COLORS.gray,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.small,
          }}
        >
          <AntDesign
            name="search1"
            size={20}
            color={COLORS.white}
            style={{
              marginRight: SIZES.base,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <TextInput
            placeholder="Rask savo mokytoja"
            style={{ flex: 1 }}
            onChangeText={onSearch}
          />
          <FontAwesome
            name="sliders"
            size={20}
            color={COLORS.white}
            style={{
              marginRight: SIZES.base,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setOpenModal(true)}
          />

          <FIlterSearch openModal={openModal} setOpenModal={setOpenModal} />
        </View>
      </View>
      {/* <TouchableOpacity onPress={onRefresh}>
        <Text>Refresh</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default HomeHeader;
