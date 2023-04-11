import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { COLORS, SIZES } from "../constants";
import timePicker from "../constants/timePicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUserData, useUserId } from "@nhost/react";
import { gql, useMutation } from "@apollo/client";

const GET_ALL_EVENTS_INFO = gql`
  query getAllEvents($date: String!, $time: String!) {
    Event(where: { date: { _eq: $date }, time: { _eq: $time } }) {
      id
      name
      postUserId
      time
      userId
      date
    }
  }
`;

const ADD_NEW_EVENT_MUTATION = gql`
  mutation addNewEvent(
    $name: String!
    $postUserId: uuid!
    $time: String!
    $userId: uuid!
    $date: String!
  ) {
    insert_Event(
      objects: [
        {
          name: $name
          postUserId: $postUserId
          time: $time
          userId: $userId
          date: $date
        }
      ]
    ) {
      returning {
        id
        name
        postUserId
        time
        userId
        date
      }
    }
  }
`;

const times = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const BookingScreen = () => {
  const route = useRoute();
  const userId = useUserId();
  const navigation = useNavigation();
  const userData = useUserData();

  // console.log(route.params?.postUserId);
  // console.log(userId);
  const postTitle = route.params?.postTitle;
  const postUserId = route.params?.postUserId;
  const userName = userData.displayName;
  // console.log(userName);

  // console.log(postUserId);
  // console.log(userId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [addNewEvent] = useMutation(ADD_NEW_EVENT_MUTATION);

  const handleTimePress = (time) => {
    setSelectedTime(time);
    setIsTimeSelected(true);
  };

  const formattedDate = selectedDate.toISOString().slice(0, 10);
  // console.log(formattedDate + " data");

  const onRezervationEvent = async () => {
    await addNewEvent({
      variables: {
        name: `Pamoka pas ${postTitle}, ${selectedTime} val. Mokinys ${userName}`,
        postUserId: postUserId,
        time: selectedTime,
        userId: userId,
        date: formattedDate,
      },
    });
    navigation.navigate("Dienotvarkė");
  };

  return (
    <View>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date()}
        endDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
        initialSelectedDate={selectedDate}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={20}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor={COLORS.primary}
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />

      <View>
        <FlatList
          numColumns={3}
          data={times}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.clockContainer,
                selectedTime === item && styles.selectedTimeContainer,
              ]}
              onPress={() => handleTimePress(item)}
            >
              <Text
                style={[
                  styles.clockTitleStyle,
                  selectedTime === item && styles.selectedTimeTitle,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* show the selected date and time */}
      {selectedTime && (
        <Text>
          Pasirinkta data: {formattedDate}, laikas: {selectedTime}
        </Text>
      )}

      {isTimeSelected ? (
        <Pressable style={styles.chatButton} onPress={onRezervationEvent}>
          <Text style={styles.chatButtonText}>Rezevuoti</Text>
        </Pressable>
      ) : (
        <View style={styles.disabledButton}>
          <Text style={styles.chatButtonText}>Pasirinkite laiką</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  clockContainer: {
    borderColor: COLORS.primary,
    width: 80,
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    padding: 5,
  },
  clockTitleStyle: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedTimeContainer: {
    backgroundColor: COLORS.primary,
  },
  selectedTimeTitle: {
    color: "#fff",
  },
  chatButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.extraLarge,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 50,
  },
  chatButtonText: {
    fontSize: SIZES.large,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default BookingScreen;