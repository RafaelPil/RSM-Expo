import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { ActivityIndicator, Alert } from "react-native";
import DrawerStack from "./DrawerStack";
import DetailsScreen from "../screens/DetailsScreen";
import UsersModal from "../modals/UsersModal";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SignedIn, useAuthenticationStatus } from "@nhost/react";
import ChatStackNavigator from "./ChatStackNavigator";
import ChatContectProvider from "../../context/ChatContext";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparen",
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <AuthStack />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function AuthStack() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isAuthenticated) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="SignUp" component={RegisterScreen} />
        <Stack.Screen name="SignIn" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <ChatContectProvider>
      <SignedIn>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={DrawerStack} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="UsersModal" component={UsersModal} />
          <Stack.Screen name="Chat" component={ChatStackNavigator} />
        </Stack.Navigator>
      </SignedIn>
    </ChatContectProvider>
  );
}
