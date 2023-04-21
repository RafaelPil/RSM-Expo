import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import SavedPostScreen from "../screens/SavedPostScreen";
import MyPostsScreen from "../screens/MyPostsScreen";
import AddPostScreen from "../screens/AddPostScreen";
import CustomDrawer from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditPostScreen from "../screens/EditPostScreen";
import AgendaScreen from "../screens/AgendaScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#00AEEF",
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: "#474747",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: SIZES.font,
          fontWeight: "500",
        },
        drawerItemStyle: {
          borderRadius: SIZES.extraLarge,
          paddingHorizontal: 6,
          marginHorizontal: 20,
        },
      }}
    >
      <Drawer.Screen
        name="Pagrindinis"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="home" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Įsiminti skelbimai"
        component={SavedPostScreen}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name="hearto" size={18} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mano skelbimai"
        component={MyPostsScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="post-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Įdėkite skelbimą"
        component={AddPostScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={19} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Pokalbiai"
        component={MessagesScreen}
        options={{
          drawerIcon: ({color}) => (
            <Entypo name="chat" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Dienotvarkė"
        component={AgendaScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-check-outline"
              size={18}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profilis"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={18} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
