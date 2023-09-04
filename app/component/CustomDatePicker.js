import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import moment from "moment-timezone";

const CustomDatePicker = ({ date, setDate }) => {
  const [open, setOpen] = useState(false);
  const newDate = moment(date).tz("Asia/Kolkata").format("YYYY/MM/DD");
  const [selectedDate, setSelectedDate] = useState(newDate);
  const handleOnPressChange = () => {
    const [year, month, tempDate] = selectedDate.split("/");

    const newDate =
      Number(year).toString() +
      "-" +
      Number(month).toString() +
      "-" +
      tempDate.toString();

    setDate(moment(new Date(newDate)).tz("Asia/Kolkata"));
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedDate(moment(date).tz("Asia/Kolkata").format("YYYY/MM/DD"));
    setOpen(false);
  };

  const handleChange = (nDate) => {
    setDate(nDate);
  };

  console.log("my date is", newDate);

  return (
    <View>
      <TouchableOpacity onPress={handleOpen}>
        <Text
          style={{
            color: "white",
            fontWeight: "medium",
            fontSize: 16,
            padding: 4,
          }}
        >
          {moment(date).tz("Asia/Kolkata").format("DD-MM-YYYY")}
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DatePicker
              mode="calendar"
              current={selectedDate}
              selected={selectedDate}
              options={{
                textHeaderColor: "#007201",
                mainColor: "#007201",
              }}
              onDateChange={(date) => {
                setSelectedDate(date);
              }}
              maximumDate={moment(new Date())
                .tz("Asia/Kolkata")
                .format("YYYY/MM/DD")}
              minimumDate={moment(new Date(2022, 0, 1))
                .tz("Asia/Kolkata")
                .format("YYYY/MM/DD")}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 2,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleClose}
                style={{ marginRight: 36, padding: 5 }}
              >
                <Text style={{ color: "#007201" }}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOnPressChange}
                style={{
                  marginRight: 20,
                  padding: 5,
                }}
              >
                <Text style={{ color: "#007201" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default CustomDatePicker;
