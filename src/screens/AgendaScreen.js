import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Agenda, AgendaEntry } from "react-native-calendars";
import Entypo from "react-native-vector-icons/Entypo";
import { COLORS, SHADOWS } from "../constants";
import HeaderComponent from "../components/HeaderComponent";
import { gql, useQuery } from "@apollo/client";
import { useUserId } from "@nhost/react";

const GetEvents = gql`
  query getAllEvents {
    Event {
      id
      name
      postUserId
      time
      userId
      date
    }
  }
`;

const AgendaScreen = () => {
  const { data, loading, error } = useQuery(GetEvents);
  // console.log(data?.Event);
  const userID = useUserId();

  const [items, setItems] = useState({});

  useEffect(() => {
    if (data && data?.Event) {
      const eventsByDate = {};
      const filteredEvents = data?.Event.filter(
        (event) => event.userId === userID
      );

      filteredEvents.forEach((event) => {
        const date = event.date;
        // console.log(date);

        if (!eventsByDate[date]) {
          eventsByDate[date] = [];
        }

        eventsByDate[date].push({
          name: event.name,
          time: event.time,
        });
      });

      setItems(eventsByDate);
    }
  }, [data]);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text></Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent headerTitle={"Dienotvarkė"} />
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AgendaScreen;
