import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Agenda } from "react-native-calendars";
import Entypo from "react-native-vector-icons/Entypo";
import { COLORS, SHADOWS } from "../constants";
import HeaderComponent from "../components/HeaderComponent";

const AgendaScreen = () => {
  const [items, setItems] = useState({});

  const onDayPress = (day) => {
    const newItems = {
      [day.dateString]: [
        {
          name: "Booking 1",
          time: "10:00 AM",
        },
        {
          name: "Booking 2",
          time: "2:00 PM",
        },
      ],
    };
    setItems(newItems);
  };

  const handleAddBooking = () => {
    const newItems = {
      "2023-04-01": [
        {
          name: "Booking 3",
          time: "1:00 PM",
        },
      ],
    };
    setItems({ ...items, ...newItems });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent headerTitle={"Dienotvarkė"} />
      {/* <TouchableOpacity style={styles.addButton} onPress={handleAddBooking}>
        <Text style={styles.addButtonText}>Add Booking</Text>
      </TouchableOpacity> */}
      <Agenda items={items} onDayPress={onDayPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AgendaScreen;
