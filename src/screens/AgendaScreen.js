import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Agenda, AgendaEntry, LocaleConfig } from "react-native-calendars";
import Entypo from "react-native-vector-icons/Entypo";
import { COLORS, SHADOWS } from "../constants";
import HeaderComponent from "../components/HeaderComponent";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useUserId } from "@nhost/react";

LocaleConfig.locales["ltu"] = {
  monthNames: [
    "Sausis",
    "Vasaris",
    "Kovas",
    "Balandis",
    "Gegužė",
    "Birželis",
    "Liepa",
    "Rugpjūtis",
    "Rugsėjis",
    "Spalis",
    "Lapkritis",
    "Gruodis",
  ],
  monthNames: [
    "Sausis",
    "Vasaris",
    "Kovas",
    "Balandis",
    "Gegužė",
    "Birželis",
    "Liepa",
    "Rugpjūtis",
    "Rugsėjis",
    "Spalis",
    "Lapkritis",
    "Gruodis",
  ],
  monthNamesShort: [
    "Sausis",
    "Vasaris",
    "Kovas",
    "Balandis",
    "Gegužė",
    "Birželis",
    "Liepa",
    "Rugpjūtis",
    "Rugsėjis",
    "Spalis",
    "Lapkritis",
    "Gruodis",
  ],
  dayNames: [
    "Sekmadienis",
    "Pirmadienis",
    "Antradienis",
    "Trečiadienis",
    "Ketvirtadienis",
    "Penktadienis",
    "Šeštadienis",
  ],
  dayNamesShort: ["Sek.", "Pirm.", "Antr.", "Treč.", "Ketv.", "Penk.", "Šešt."],
  today: "Šiandien",
};

LocaleConfig.defaultLocale = "ltu";

const GetEvents = gql`
  subscription getAllEvents {
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
  const userID = useUserId();

  const [items, setItems] = useState({});
  const [selected, setSelected] = useState("");
  const { data, loading, error } = useSubscription(GetEvents);

  console.log(data);

  useEffect(() => {
    if (data) {
      const newItems = {};
      data?.Event?.forEach((event) => {
        if (event.userId === userID || event.postUserId === userID) {
          const date = event.date;
          if (newItems[date]) {
            newItems[date].push(event);
          } else {
            newItems[date] = [event];
          }
        }
      });
      setItems(newItems);
    }
  }, [data, userID]);

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

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <View>
        <Text>Error on Agenda</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderComponent headerTitle={"Dienotvarkė"} />
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: COLORS.primary,
            selectedDotColor: "#fff",
          },
        }}
        theme={{
          todayTextColor: COLORS.primary,
          selectedDayBackgroundColor: COLORS.primary,
        }}
        scrollEnabled
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
