import { createContext, useContext } from "react";

export const ChatContext = createContext({});

const ChatContectProvider = ({ children }) => {
  const value = {username: "Veikia.lt"};

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext)

export default ChatContectProvider;
