import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, SIZES } from "../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NhostClient, useProviderLink } from "@nhost/react";

const MainScreen = () => {
  const { height, width } = Dimensions.get("window");

  const navigation = useNavigation();

  const { google } = useProviderLink();
  const onGoogleSignIn = async () => {
    await Linking.openURL(google);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: height, width: width }}>
        <Image
          source={require("../../assets/images/bg.jpg")}
          style={{ width: width, height: height }}
        />
      </View>

      <View style={{ margin: 50, backgroundColor: "#fff" }}>
        <Pressable
          style={[styles.btnContainer, { width: width - 80 }]}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ fontSize: SIZES.font, fontWeight: "bold" }}>
            Registruotis
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.btnContainer,
            { width: width - 80, backgroundColor: "#4267B2" },
          ]}
        >
          <View style={styles.colorBtnContainer}>
            <FontAwesome name="facebook" size={16} color={"#fff"} />

            <Text style={styles.textFb}>Prisijungti su Facebook</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={[
            styles.btnContainer,
            { width: width - 80, backgroundColor: "#DB4437" },
          ]}
        >
          <Pressable onPress={onGoogleSignIn} style={styles.colorBtnContainer}>
            <AntDesign name="google" size={16} color={"#fff"} />
            <Text style={styles.textGoogle}>Prisijungti su Google</Text>
          </Pressable>
        </Pressable>

        <Pressable
          style={{
            width: width - 80,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text
            style={{
              fontSize: SIZES.font,
              fontWeight: "bold",
            }}
          >
            Prisijungti
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnContainer: {
    backgroundColor: "#e4e4e4",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  textFb: {
    color: "#fff",
    fontSize: SIZES.font,
    marginLeft: 10,
    fontWeight: "bold",
  },
  textGoogle: {
    color: "#fff",
    fontSize: SIZES.font,
    marginLeft: 10,
    fontWeight: "bold",
  },
  colorBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
