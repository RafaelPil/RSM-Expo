import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { ActivityIndicator } from "react-native";
import DrawerStack from "./DrawerStack";
import DetailsScreen from "../screens/DetailsScreen";
import UsersModal from "../modals/UsersModal";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SignedIn, useAuthenticationStatus } from "@nhost/react";
import ChatContextProvider from "../../context/ChatContext";
import ChatsScreen from "../screens/Chat/ChatsScreen";
import ChatRoomScreen from "../screens/Chat/ChatRoomScreen";
import EditPostScreen from "../screens/EditPostScreen";
import { COLORS } from "../constants";
import BookingScreen from "../screens/BookingScreen";

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
    <ChatContextProvider>
      <SignedIn>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={DrawerStack} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="UsersModal" component={UsersModal} />

          <Stack.Screen
            name="Chats"
            component={ChatsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoomScreen}
            options={{ headerShown: true }}
          />
          {/* <Stack.Screen
            name="Agenda"
            component={AgendaScreen}
            options={{
              headerShown: false,
              title: "Dienotvarkė",
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTintColor: "#fff",
            }}
          /> */}
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{
              headerShown: false,
              title: "Rezervuoti laika",
              headerStyle: {
                backgroundColor: COLORS.white,
              },
              // headerTintColor: "#474747",
            }}
          />
          <Stack.Screen
            name="EditPost"
            component={EditPostScreen}
            options={{
              headerShown: false,
              title: "Redaguojamas skelbimas",
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </SignedIn>
    </ChatContextProvider>
  );
}
