import { useUserData } from "@nhost/react";
import { createContext, useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export const ChatContext = createContext({});

const ChatContectProvider = ({ children }) => {
  // component
  const [chatClient, setChatClient] = useState();

  const user = useUserData();

  useEffect(() => {
    const initChat = async () => {
      if (!user) {
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
    };

    initChat();
  }, []);

  useEffect(() => {
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, []);

  const value = { username: "Veikia.lt" };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContectProvider;
