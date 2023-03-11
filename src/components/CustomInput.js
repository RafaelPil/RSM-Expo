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

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  const { height, width } = useWindowDimensions();

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
              ]}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
              />
            </View>
            {error && (
              <Text
                style={{ color: "red", alignSelf: "stretch", marginLeft: 15 }}
              >
                {error.message || "Klaida"}
              </Text>
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
    borderRadius: 10,

    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
    height: 50,
    marginHorizontal: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  input: {
    color: COLORS.gray,
    fontSize: SIZES.font,
  },
});

export default CustomInput;
