import {
  View,
  Text,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import { COLORS, SIZES } from "../constants";
import { useState } from "react";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
  heightInput,
  multilineInput,
  value,
}) => {
  const { height, width } = useWindowDimensions();
  const [secureEntry, setSecureEntry] = useState(false);

  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View
              style={[
                styles.container,
                { borderColor: error ? "red" : "#e8e8e8" },
                { height: heightInput ? heightInput : 45 },
              ]}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={[styles.input]}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multilineInput}
              />
            </View>
            {error && (
              <Text style={styles.text}>{error.message || "Klaida"}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 45,
    marginHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    color: "#474747",
    fontSize: SIZES.font,
    textDecorationLine: "none",
  },
  text: {
    color: "red",
    alignSelf: "stretch",
    marginLeft: 20,
    fontSize: SIZES.small,
    marginBottom: 10,
  },
});

export default CustomInput;
