import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SavedPostScreen from '../screens/SavedPostScreen';
import MyPostsScreen from '../screens/MyPostsScreen';
import AddPostScreen from '../screens/AddPostScreen';
import CustomDrawer from '../components/CustomDrawer';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary,
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {marginLeft: -25, fontSize: SIZES.font},
      }}>
      <Drawer.Screen
        name="Pagrindinis"
        component={HomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Entypo name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Įsiminti skelbimai"
        component={SavedPostScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="hearto" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Mano skelbimai"
        component={MyPostsScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="post" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Įdėkite skelbimą"
        component={AddPostScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="add" size={22} color={color} />
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
        name="Profilis"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Entypo name="chat" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
