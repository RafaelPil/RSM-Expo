import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useAuthenticationStatus } from "@nhost/react";
import { ActivityIndicator } from "react-native";
import DrawerStack from "./DrawerStack";
import DetailsScreen from "../screens/DetailsScreen";
import UsersModal from "../modals/UsersModal";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isAuthenticated) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  if (isAuthenticated) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={DrawerStack} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="UsersModal" component={UsersModal} />
        {/* <Stack.Screen name="Messages" component={MessagesScreen} /> */}
        {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
      </Stack.Navigator>
    );
  }
};

export default AuthStack;
