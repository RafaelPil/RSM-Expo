import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { assets, COLORS, SIZES } from "../constants";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

const HeaderComponent = (props) => {
  const headerTitle = props.headerTitle;
  const navigation = useNavigation();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{headerTitle}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={26} color="#474747" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: SIZES.font,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTextContainer: {
    marginVertical: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 25,
  },
  headerText: {
    fontSize: SIZES.large,
    color: "#474747",
    fontWeight: "bold",
  },
});

export default HeaderComponent;
