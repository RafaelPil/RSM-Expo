import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUserData, useUserId } from "@nhost/react";
import { gql, useMutation } from "@apollo/client";
import CalendarStrip from "react-native-calendar-strip";
import { FocusedStatusBar } from "../components";
import "moment/locale/fr";

const locale = {
  name: "fr",
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

const MUTATION_ADD_POST = gql`
  mutation addPost(
    $userId: uuid!
    $city: String!
    $description: String!
    $image: String!
    $price: String!
    $title: String!
    $datePicked: String!
    $timePicked: String!
    $date: timestamptz!
  ) {
    insert_Post(
      objects: {
        userId: $userId
        city: $city
        description: $description
        image: $image
        price: $price
        title: $title
        datePicked: $datePicked
        timePicked: $timePicked
        date: $date
      }
    ) {
      returning {
        city
        date
        description
        image
        price
        title
        userId
      }
    }
  }
`;

const ReservationDataTimeScreen = () => {
  const route = useRoute();
  const userId = useUserId();
  const navigation = useNavigation();
  const userData = useUserData();

  // console.log(route.params?.postUserId);
  // console.log(userId);
  const city = route.params?.city;
  const description = route.params?.description;
  const price = route.params?.price;
  const imageUri = route.params?.imageUri;
  const title = route.params?.title;
  const timestamp = route.params?.timestamp;

  const userName = userData.displayName;
  console.log(timestamp);

  // console.log(postUserId);
  // console.log(userId);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState([]);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const [mutation_addPost] = useMutation(MUTATION_ADD_POST);

  const handleTimePress = (time) => {
    if (selectedTime.includes(time)) {
      setSelectedTime(selectedTime.filter((t) => t !== time));
    } else {
      setSelectedTime([...selectedTime, time]);
    }
  };

  // check if at least one time is selected
  useEffect(() => {
    setIsTimeSelected(selectedTime.length > 0);
  }, [selectedTime]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
    try {
      await mutation_addPost({
        variables: {
          userId: userId,
          city: city,
          description: description,
          price: price,
          image: imageUri,
          title: title,
          date: timestamp,
          datePicked: formattedDate,
          timePicked: selectedTime.join(","),
        },
      });
      navigation.navigate("Pagrindinis");
      setTitle("");
      setPrice("");
      setCity("");
      setDescription("");
      setImageUri("");
    } catch (e) {
      Alert.alert(e, "Serverio klaida");
    }
    //navigation.navigate("Kalendorius");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="#00AEEF"
        transLucent={true}
      />
      <View style={styles.rowContainer}>
        <View style={styles.leftIconContainer}>
          <Pressable onPress={moveBack}>
            <AntDesign
              name="left"
              size={20}
              color="#474747"
              style={{ fontWeight: "bold" }}
            />
          </Pressable>
        </View>
        <View style={styles.rowCenterText}>
          <Text style={styles.rowHeaderText}>Laiko valdymas</Text>
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
                selectedTime.includes(item) && styles.selectedTimeContainer,
              ]}
              onPress={() => handleTimePress(item)}
            >
              <Text
                style={[
                  styles.clockTitleStyle,
                  selectedTime.includes(item) && styles.selectedTimeTitle,
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
          <Text style={styles.chatButtonText}>Pridėti paslaugą</Text>
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
    marginHorizontal: 20,
    marginTop: "auto",
    marginBottom: 20,
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

export default ReservationDataTimeScreen;
