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
import { SafeAreaView } from "react-native";
import { FocusedStatusBar } from "../components";

const MainScreen = () => {
  const { height, width } = Dimensions.get("window");

  const navigation = useNavigation();

  const { google } = useProviderLink();
  const onGoogleSignIn = async () => {
    await Linking.openURL(google);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="#00AEEF"
        transLucent={true}
      />
      <View style={{ height: 430, width: width }}>
        <Image
          source={require("../../assets/images/ft1.png")}
          style={{ width: width, height: 400 }}
        />
      </View>

      <View style={styles.btnsContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/icons/logo.png")}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={styles.homeText}
          >{`Rask savo mokytoją. \nTavo sėkmės raktas.`}</Text>
        </View>

        <View style={{ marginTop: 45 }}>
          <Pressable
            style={[styles.signInContainer, { width: width - 50 }]}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.btnText}>Prisijungti</Text>
          </Pressable>

          <View
            style={[
              styles.btnContainer,
              {
                width: width - 50,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              },
            ]}
          >
            <Text style={styles.regText}>Neturi paskyros? </Text>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.btnRegisterText}>Registruokis</Text>
            </Pressable>
          </View>
        </View>

        {/* <Pressable
          style={[
            styles.btnContainer,
            { width: width - 80, backgroundColor: "#4267B2" },
          ]}
        >
          <View style={styles.colorBtnContainer}>
            <FontAwesome name="facebook" size={16} color={"#fff"} />

            <Text style={styles.textFb}>Prisijungti su Facebook</Text>
          </View>
        </Pressable> */}

        {/* <Pressable
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
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
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
  signInContainer: {
    backgroundColor: "#00AEEF",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 20,
    marginBottom: 10,
  },
  btnText: {
    fontSize: SIZES.font,

    color: "#fff",
  },
  btnRegisterText: {
    fontSize: SIZES.font,
    textAlign: "center",
    color: "#00AEEF",
  },
  regText: {
    color: "#474747",
  },
  btnsContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: 60,
    width: 60,
    alignContent: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 12,
  },
  homeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#474747",
  },
});

export default MainScreen;
