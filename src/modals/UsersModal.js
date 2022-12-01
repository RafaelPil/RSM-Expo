import { View, Text, Modal, FlatList } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { dummyPosts } from "../constants";
import UsersListItem from "../components/UsersListItem";

const UsersModal = ({ openModal, setOpenModal, route }) => {
  const navigation = useNavigation();
  const id = route?.params?.id;
  console.log(id);
  return (
    <Modal visible={openModal} animationType="slide">
      <View>
        <MaterialIcons
          name="close"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <FlatList
          data={dummyPosts}
          renderItem={({ item }) => <UsersListItem user={item} />}
        />
      </View>
    </Modal>
  );
};

export default UsersModal;
