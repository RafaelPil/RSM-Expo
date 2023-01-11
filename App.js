import React from "react";
import { NhostClient, NhostProvider, NhostReactProvider } from "@nhost/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { NhostApolloProvider } from "@nhost/react-apollo";
import Navigation from "./src/navigation/AuthStack";

const nhost = new NhostClient({
  subdomain: "cqdfqhvzqoncuuocckvj",
  region: "eu-central-1",
  clientStorageType: "expo-secure-storage",
  clientStorage: SecureStore,
});

export default function App() {
  return (
    <SafeAreaProvider>
      <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <Navigation />
        </NhostApolloProvider>
      </NhostReactProvider>
    </SafeAreaProvider>
  );
}
