import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatsScreen from "../screens/Chat/ChatsScreen";
import ChatRoomScreen from "../screens/Chat/ChatRoomScreen";
import ChatContectProvider from "../../context/ChatContext";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <ChatContectProvider>
      <Stack.Navigator>
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      </Stack.Navigator>
    </ChatContectProvider>
  );
};
