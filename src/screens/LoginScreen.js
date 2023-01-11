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
import React, { useEffect, useState, createContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import { useSignInEmailPassword } from "@nhost/react";

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
    const { error, needsEmailVerification } = await signInEmailPassword(
      email,
      password
    );

    if (error) {
      Alert.alert("Atsiprašome", error.message);
    }

    if (needsEmailVerification) {
      Alert.alert("Patvirtink savo el. pašta", error.message);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 5 }}>
      <Pressable onPress={moveBack} style={{ padding: 10 }}>
        <Ionicons name="arrow-back-sharp" size={24} color={COLORS.primary} />
      </Pressable>

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
          style={[styles.btnContainer, { width: width - 250 }]}
          onPress={handleSubmit(onSignInPressed)}
        >
          <Text style={{ fontSize: 14 }}>
            {isLoading ? "Krauna..." : "Prisijungti"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 15,
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontWeight: "bold",
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
    backgroundColor: COLORS.gray_button,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    marginTop: 50,
  },
});

export default LoginScreen;
