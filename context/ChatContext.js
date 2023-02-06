import { useUserData } from "@nhost/react";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat, Channel } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";

export const ChatContext = createContext({});

const ChatContectProvider = ({ children }) => {
  // component
  const [chatClient, setChatClient] = useState();
  const [currentChannel, setCurrentChannel] = useState();
  const [isConnected, setIsConnected] = useState(false);

  const user = useUserData();

  useEffect(() => {
    const initChat = async () => {
      if (!user || isConnected) {
        return;
      }

      const client = StreamChat.getInstance("hfuvrfq36x2z");

      // get information about the authenticated user
      // connect the user to stream chat
      await client.connectUser(
        {
          id: user.id,
          name: user.displayName,
          image: user.avatarUrl,
        },
        client.devToken(user.id)
      );

      setChatClient(client);
      setIsConnected(true);

      const globalChannel = client.channel("livestream", "global", {
        name: "RSM",
        image:
          "https://img.freepik.com/premium-photo/futuristic-cyber-cat-cyberpunk-style-digital-art-style-illustration-painting_743201-3266.jpg",
      });

      await globalChannel.watch();
    };

    initChat();
  }, [user]);

  useEffect(() => {
    return () => {
      chatClient?.disconnectUser();
    };
  }, [chatClient]);

  if (!chatClient) {
    return <ActivityIndicator />;
  }

  const value = { currentChannel, setCurrentChannel, chatClient };
  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContectProvider;
