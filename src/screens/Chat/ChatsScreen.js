import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { ChannelList } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";

const ChatsScreen = () => {
  const { setCurrentChannel, chatClient } = useChatContext();

  const navigation = useNavigation();

  const onSelect = async (channel) => {
    setCurrentChannel(channel);
    navigation.navigate("ChatRoom");
  };

  const filters = { members: { $in: [chatClient.userID] } };

  return <ChannelList onSelect={onSelect} filters={filters} />;
};

export default ChatsScreen;
