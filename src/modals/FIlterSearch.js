import {View, Text, Modal} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FIlterSearch = ({openModal, setOpenModal}) => {
  return (
    <Modal visible={openModal} animationType="slide">
      <View>
        <MaterialIcons
          name="close"
          size={24}
          onPress={() => setOpenModal(false)}
        />
        <Text>Modal</Text>
      </View>
    </Modal>
  );
};

export default FIlterSearch;
