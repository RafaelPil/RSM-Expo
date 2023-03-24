import React from "react";
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
  const sort = { last_message_at: -1 };

  return (
    <ChannelList
      onSelect={onSelect}
      filters={filters}
      sort={sort}
      options={[{ watch: true, state: true }]}
    />
  );
};

export default ChatsScreen;
