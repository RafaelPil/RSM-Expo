import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import ChatScreen from '../screens/ChatScreen';
import MessagesScreen from '../screens/MessagesScreen';
import DrawerStack from './DrawerStack';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={DrawerStack} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default Router;
