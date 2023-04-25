import React, { useEffect } from "react";
import { useChatContext } from "../../../context/ChatContext";
import { ChannelList } from "stream-chat-expo";
import { useNavigation } from "@react-navigation/native";
import { FocusedStatusBar } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, Text } from "react-native";

const ChatsScreen = () => {
  const { setCurrentChannel, chatClient, currentChannel } = useChatContext();

  const navigation = useNavigation();

  const onSelect = async (channel) => {
    setCurrentChannel(channel);
    navigation.navigate("ChatRoom");
  };

  const filters = { type: "messaging", members: { $in: [chatClient.userID] } };
  const sort = { last_message_at: -1 };

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
          <Text style={styles.rowHeaderText}>Pokalbiai</Text>
        </View>
      </View>
      <ChannelList
        onSelect={onSelect}
        filters={filters}
        sort={sort}
        options={[{ watch: true, state: true }]}
      />
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
});

export default ChatsScreen;
