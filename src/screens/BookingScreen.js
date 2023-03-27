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
import { COLORS } from "../constants";
import timePicker from "../constants/timePicker";
import { TouchableOpacity } from "react-native-gesture-handler";

const BookingScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  // const currentTime = new Date().toLocaleTimeString("en-US", {
  //   hour: "numeric",
  //   minute: "2-digit",
  //   hour12: true,
  // });
  // console.log(currentTime); // e.g. "1:30 PM"

  const handleTimePress = (time) => {
    setSelectedTime(time); // update the selected time state
  };

  const formattedDate = selectedDate.toISOString().slice(0, 10);
  console.log(formattedDate);

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
          data={timePicker}
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
});

export default BookingScreen;
