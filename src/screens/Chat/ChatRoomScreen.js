import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import { FocusedStatusBar } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, Text } from "react-native";

const ChatRoomScreen = () => {
  const { currentChannel, chatClient } = useChatContext();
  const navigation = useNavigation();
  const [titleName, setTitleName] = useState("");

  useEffect(() => {
    // navigation.setOptions({
    //   title: currentChannel.data.name || "Channel",
    // });

    setTitleName(currentChannel.data.created_by.name || "Channel");
  }, [currentChannel.data.created_by.name]);

  console.log(currentChannel.data.created_by.name);

  const moveBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="#00AEEF"
        transLucent={true}
      />

      <View style={styles.rowContainer}>
        <View style={styles.leftIconContainer}>
          <Pressable onPress={moveBack} style={{ padding: 10 }}>
            <AntDesign
              name="left"
              size={20}
              color="#474747"
              style={{ fontWeight: "bold" }}
            />
          </Pressable>
        </View>
        <View style={styles.rowCenterText}>
          <Text style={styles.rowHeaderText}>{titleName}</Text>
        </View>
      </View>

      <View style={styles.chatContainer}>
        <Channel channel={currentChannel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  rowCenterText: {
    alignItems: "center",
    flex: 1,
    marginRight: 50,
  },
  rowHeaderText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#474747",
  },
  chatContainer: {
    marginBottom: 60,
  },
});

export default ChatRoomScreen;
