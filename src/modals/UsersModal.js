import {
  View,
  Text,
  Modal,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { dummyPosts } from "../constants";
import UsersListItem from "../components/UsersListItem";
import { gql, useQuery } from "@apollo/client";
import { useChatContext } from "../../context/ChatContext";

const GetUsers = gql`
  query GetUsers {
    users {
      id
      displayName
      avatarUrl
    }
  }
`;

const UsersModal = ({ openModal, setOpenModal, route }) => {
  const navigation = useNavigation();
  const id = route?.params?.id;
  console.log(id);
  const { startDMChatRoom } = useChatContext();

  const { data, loading, error } = useQuery(GetUsers);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  console.log(data);

  return (
    <Modal visible={openModal} animationType="slide">
      <Pressable onPress={() => startDMChatRoom()}>
        <MaterialIcons
          name="close"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <FlatList
          data={data.users}
          renderItem={({ item }) => <UsersListItem user={item} />}
        />
      </Pressable>
    </Modal>
  );
};

export default UsersModal;
