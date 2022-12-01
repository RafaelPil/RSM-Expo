import { View, Text, Modal, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { dummyPosts } from "../constants";
import UsersListItem from "../components/UsersListItem";
import { gql, useQuery } from "@apollo/client";

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
      <View>
        <MaterialIcons
          name="close"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <FlatList
          data={data.users}
          renderItem={({ item }) => <UsersListItem user={item} />}
        />
      </View>
    </Modal>
  );
};

export default UsersModal;
