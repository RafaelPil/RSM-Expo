import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUserData, useUserId } from "@nhost/react";
import { gql, useMutation } from "@apollo/client";
import CalendarStrip from "react-native-calendar-strip";

const locale = {
  name: "ltu",
  config: {
    months:
      "Sausis_Vasaris_Kovas_Balandis_Gegužė_Birželis_Liepa_Rugpjūtis_Rugsėjis_Spalis_Lapkritis_Gruodis".split(
        "_"
      ),
    monthsShort:
      "Sausis_Vasaris_Kovas_Balandis_Gegužė_Birželis_Liepa_Rugpjūtis_Rugsėjis_Spalis_Lapkritis_Gruodis".split(
        "_"
      ),
    weekdays:
      "Sekmadienis_Pirmadienis_Antradienis_Trečiadienis_Ketvirtadienis_Penktadienis_Šeštadienis".split(
        "_"
      ),
    weekdaysShort: "Sk_Pr_An_Tr_Kt_Pn_Št".split("_"),
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
  },
};

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
  "18:00",
  "19:00",
  "20:00",
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

  const handleDateSelected = (date) => {
    setSelectedDate(date);
  };

  const formattedDate = selectedDate.toISOString().slice(0, 10);
  // console.log(formattedDate + " data");
  // console.log(selectedTime);

  const moveBack = () => {
    navigation.goBack();
  };

  const onRezervationEvent = async () => {
    await addNewEvent({
      variables: {
        name: `\n${userName} - ${selectedTime} val.`,
        postUserId: postUserId,
        time: selectedTime,
        userId: userId,
        date: formattedDate,
      },
    });
    navigation.navigate("Dienotvarkė");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.rowContainer}>
        <View style={styles.leftIconContainer}>
          <Pressable onPress={moveBack}>
            <AntDesign
              name="left"
              size={20}
              color={COLORS.primary}
              style={{ fontWeight: "bold" }}
            />
          </Pressable>
        </View>
        <View style={styles.rowCenterText}>
          <Text style={styles.rowHeaderText}>Laiko rezervacija</Text>
        </View>
      </View>
      {/* <HorizontalDatepicker
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
      /> */}

      <CalendarStrip
        scrollable
        style={{
          height: 100,
          paddingTop: 20,
          paddingBottom: 10,
          width: "120%",
          backgroundColor: "#fff",
          marginLeft: -35,
          // position: "absolute",
        }}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: "white",
        }}
        highlightDateNumberStyle={{ color: "#00AEEF" }}
        highlightDateNameStyle={{ color: "#00AEEF" }}
        calendarHeaderStyle={{
          color: "#474747",
          fontWeight: "400",
          marginBottom: 20,
        }}
        dateNumberStyle={{ color: "#D4D4D4" }}
        dateNameStyle={{ color: "#D4D4D4" }}
        iconContainer={{ flex: 0.1 }}
        leftSelector={[]}
        rightSelector={[]}
        onDateSelected={handleDateSelected}
        selectedDate={selectedDate}
        locale={locale}
      />

      <View style={styles.clockMainContainer}>
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
      {/* {selectedTime && (
        <View style={styles.selectedDateTimeStyle}>
          <Text>
            Pasirinkta data: {formattedDate}, laikas: {selectedTime}
          </Text>
        </View>
      )} */}

      {isTimeSelected ? (
        <Pressable style={styles.chatButton} onPress={onRezervationEvent}>
          <Text style={styles.chatButtonText}>Rezevuoti</Text>
        </Pressable>
      ) : (
        <View style={styles.disabledButton}>
          <Text style={styles.chatButtonNotText}></Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  clockMainContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  clockContainer: {
    borderColor: "#E8E8E8",
    width: 110,
    borderWidth: 1,
    borderRadius: 20,
    margin: 6,
    padding: 5,
    backgroundColor: COLORS.white,
  },
  clockTitleStyle: {
    fontSize: 13,
    color: "#474747",
    fontWeight: "500",
    textAlign: "center",
  },
  selectedTimeContainer: {
    backgroundColor: "#00AEEF",
  },
  selectedTimeTitle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 13,
    textAlign: "center",
  },
  chatButton: {
    backgroundColor: "#00AEEF",
    borderRadius: SIZES.extraLarge,
    padding: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 70,
    marginTop: "auto",
    marginBottom: 10,
  },
  disabledButton: {
    marginTop: 10,
  },
  chatButtonText: {
    fontSize: SIZES.large,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "500",
  },
  chatButtonNotText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "500",
  },
  selectedDateTimeStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  rowCenterText: {
    alignItems: "center",
    flex: 1,
    marginRight: 15,
  },
  rowHeaderText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#474747",
  },
});

export default BookingScreen;
