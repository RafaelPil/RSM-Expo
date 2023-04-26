import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import { useSignInEmailPassword } from "@nhost/react";
import { Alert } from "react-native";
import { FocusedStatusBar } from "../components";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LoginScreen = () => {
  const { height, width } = useWindowDimensions();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { signInEmailPassword, isLoading, isSuccess } =
    useSignInEmailPassword();

  const moveBack = () => {
    navigation.goBack();
  };

  const onSignInPressed = async (data) => {
    if (isLoading) {
      return;
    }
    const { email, password } = data;
    const { error, needsEmailVerification, isSuccess } =
      await signInEmailPassword(email, password);

    if (error) {
      Alert.alert("Tokio naudotojo nėra");
    }

    if (needsEmailVerification) {
      Alert.alert("Patvirtink savo el. pašta", error.message);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 30 }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="#00AEEF"
        transLucent={true}
      />
      <View style={styles.rowContainer}>
        <View style={styles.leftIconContainer}>
          <Pressable onPress={moveBack} style={{ padding: 10 }}>
            <AntDesign
              name="left"
              size={20}
              color="#474747"
              style={{ fontWeight: "bold" }}
            />
          </Pressable>
        </View>
        <View style={styles.rowCenterText}>
          <Text style={styles.rowHeaderText}>Prisijungti</Text>
        </View>
      </View>

      <Text style={styles.text}>El. paštas</Text>
      <CustomInput
        name="email"
        placeholder=""
        control={control}
        keyboardType="email-address"
        rules={{
          required: "Įveskite el. pašta",
          pattern: { value: EMAIL_REGEX, message: "Neteisingas el. paštas" },
        }}
      />

      <Text style={styles.text}>Slaptažodis</Text>
      <CustomInput
        name="password"
        placeholder=""
        control={control}
        secureTextEntry
        rules={{
          required: "Įveskite slaptažodi",
          minLength: {
            value: 8,
            message: "Slaptažodis turi būti ne mažiau kaip 8 simboliai",
          },
        }}
      />

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={[styles.btnContainer, { width: width - 150 }]}
          onPress={handleSubmit(onSignInPressed)}
        >
          <Text style={{ fontSize: 14, color: "#fff" }}>
            {isLoading ? "Krauna..." : "Prisijungti"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 30,
  },
  rowCenterText: {
    alignItems: "center",
    flex: 1,
    marginRight: 50,
  },
  rowHeaderText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#474747",
  },
  text: {
    marginLeft: 20,
    color: "#474747",
    fontSize: 14,
    fontWeight: "400",
  },
  textInpt: {
    justifyContent: "center",
    height: 40,
    marginLeft: 12,
    marginTop: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnContainer: {
    backgroundColor: "#00AEEF",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 20,
    marginTop: 50,
  },
});

export default LoginScreen;
