import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthStack from "./src/navigation/AuthStack";

import { NhostClient, NhostReactProvider } from "@nhost/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

const nhost = new NhostClient({
  subdomain: "zeffilurptqhgdwygtvd",
  region: "eu-central-1",
  clientStorageType: "expo-secure-storage",
  clientStorage: SecureStore,
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparen",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NhostReactProvider nhost={nhost}>
        <NavigationContainer theme={theme}>
          <AuthStack />
        </NavigationContainer>
      </NhostReactProvider>
    </SafeAreaProvider>
  );
}
