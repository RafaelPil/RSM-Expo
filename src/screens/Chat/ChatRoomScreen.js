import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

const ChatRoomScreen = () => {
  const { currentChannel, chatClient } = useChatContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: currentChannel.data.created_by.name || "Channel",
    });
  }, [currentChannel.data.created_by.name]);

  console.log(currentChannel.data);

  return (
    <Channel channel={currentChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChatRoomScreen;
