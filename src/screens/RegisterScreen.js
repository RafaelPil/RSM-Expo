import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import CustomInputPhone from "../components/CustomInputPhone";
import { useSignUpEmailPassword } from "@nhost/react";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterScreen = () => {
  const { height, width } = useWindowDimensions();

  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();

  const moveBack = () => {
    navigation.goBack();
  };

  const onRegisterPressed = async (data) => {
    if (isLoading) {
      return;
    }
    const { name, email, password } = data;
    // sign up
    const { error, isSuccess } = await signUpEmailPassword(email, password, {
      displayName: name.trim(),
      metadata: { name },
    });
    if (error) {
      Alert.alert("Oops", error.message);
    }
    // if (isSuccess) {
    //   navigation.navigate("SignIn");
    // }
  };

  return (
    <SafeAreaView style={{ marginTop: 5 }}>
      <Pressable onPress={moveBack} style={{ padding: 10 }}>
        <Ionicons name="arrow-back-sharp" size={24} color={COLORS.primary} />
      </Pressable>

      <Text style={styles.text}>Vardas</Text>
      <CustomInput
        name="name"
        placeholder=""
        control={control}
        rules={{
          required: "Įveskite varda",
          minLength: {
            value: 3,
            message: "Vardas turi būti ne mažiau kaip 3 simboliai",
          },
          maxLength: {
            value: 24,
            message: "Vardas turi būti ne daugiau kaip 24 simboliai",
          },
        }}
      />

      <Text style={styles.text}>Tel. nr</Text>
      <CustomInputPhone
        name="phone"
        placeholder=""
        control={control}
        keyboardType="numeric"
        rules={{
          required: "Įveskite telefono nr.",
          minLength: {
            value: 8,
            message: "Tokio numerio nera",
          },
          maxLength: {
            value: 8,
            message: "Tokio numerio nera",
          },
        }}
      />

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

      <Text style={styles.text}>Pakartoti slaptažodi</Text>
      <CustomInput
        name="password-repeat"
        placeholder=""
        control={control}
        secureTextEntry
        rules={{
          required: "Įveskite pakartotina slaptažodi",
          validate: (value) => value === pwd || "Slaptažodis neatitinka",
        }}
      />

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={[styles.btnContainer, { width: width - 250 }]}
          onPress={handleSubmit(onRegisterPressed)}
        >
          <Text style={{ fontSize: 14 }}>
            {isLoading ? "Registruojama..." : "Registruotis"}
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
    fontSize: SIZES.medium,
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
    backgroundColor: COLORS.gray_button,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    marginTop: 50,
  },
});

export default RegisterScreen;
