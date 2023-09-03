// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { useLocalSearchParams } from "expo-router/src/hooks";
// import { useEffect } from "react";

// export default function City({ route }) {
//   const params = useLocalSearchParams();

//   useEffect(() => {
//     console.log("params and param", params);
//   }, [params]);

//   return (
//     <View style={styles.container}>
//       <Text>City Page sholsdlf d ehre </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { useLocalSearchParams } from "expo-router/src/hooks";
import { Table, Row, Rows } from "react-native-table-component";
import { Button, SafeAreaView } from "react-native";
import { View, StyleSheet, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { convertTo12HourFormat } from "../../service/service";
import { ScrollView } from "react-native-gesture-handler";

const City = ({ route }) => {
  // (new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [currentState, setCurrentState] = useState("");
  const [items, setItems] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date(moment().tz("Asia/Kolkata"))
  );

  const params = useLocalSearchParams();
  const { cityData } = params;

  if (currentState !== cityData?.title) {
    setCurrentState(cityData?.title);
  }

  useEffect(() => {
    setCurrentDate(new Date(moment().tz("Asia/Kolkata")));
  }, [currentState]);

  const onChange = (event) => {
    console.log("my date is", event);
    const currentDate = event;
    setShow(false);
    setCurrentDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  console.log("===============>", cityData);

  let HeadTable = ["Head1", "Head2"];
  let DataTable = [];

  const getCardData = (date) => {
    const apiKey = "https://rdl-result.com/api";
    const newDate = moment(date).tz("Asia/Kolkata").format("YYYY/MM/DD");
    axios
      .post(apiKey + "/getClientSideData", { date: newDate })
      .then((response) => {
        setItems(response?.data?.logs);
      });
  };

  useEffect(() => {
    getCardData(currentDate);
  }, [currentDate]);

  HeadTable = ["Time/Date", "Number"];
  let currentData = items.filter((item) => {
    return item?.title === cityData?.title;
  });

  if (currentData.length > 0) {
    DataTable = currentData[0]?.values.map((val, index) => {
      return [convertTo12HourFormat(currentData[0]?.timesList[index]), val];
    });
  }

  return (
    <View
      style={{
        backgroundColor: "#FEC200",
        // marginBottom: 10,
        flex: 1,
        minHeight: 200,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
        }}
      >
        <View style={{ height: 30, width: 210 }}>
          <Text
            style={{
              color: "green",
              fontSize: 26,
              marginLeft: 20,
              fontWeight: "bold",
              marginRight: 10, // Add some spacing between the two Text elements
            }}
          >
            {cityData?.title}
          </Text>
        </View>

        <SafeAreaView>
          <Text
            onPress={showDatepicker}
            style={{
              fontSize: 16,
              marginLeft: 4,
              color: "white",
              fontWeight: "medium",
              backgroundColor: "green",
              padding: 10,
            }}
          >
            {moment(currentDate).format("DD-MM-YYYY")}
          </Text>
          {/* <DateTimePickerModal
            isVisible={show} // Use your state variable here
            mode={mode}
            date={currentDate}
            onConfirm={onChange}
            onCancel={() => setShow(false)}
            maxDate={new Date(moment().tz("Asia/Kolkata"))}
          /> */}

          {/* <DateTimePickerModal
            date={date}
            mode={mode}
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                display: "none",
              },
              dateInput: {
                backgroundColor: "red",
                borderWidth: 0,
              },
              dateText: {
                color: "white",
              },
            }}
            onConfirm={onChange}
            onCancel={() => setShow(false)}
          /> */}
        </SafeAreaView>
      </View>
      <Table>
        <View style={{ margin: 10 }}>
          <Row
            style={styles.HeadTableTextData}
            data={HeadTable}
            textStyle={styles.headText}
          />
        </View>
      </Table>

      <ScrollView>
        <Table>
          <View>
            <ScrollView>
              <Rows
                style={styles.TableTextData}
                data={DataTable}
                textStyle={styles.text}
              />
            </ScrollView>
          </View>
        </Table>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 10,
  },
  headText: {
    textAlign: "center",
    fontSize: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  HeadTableTextData: {
    marginTop: 10,
    marginRight: 3,
    // textAlign: "center",
    // flex: 1,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "ceter",
    justifyContent: "center",
    paddingLeft: 6,
  },
  dataWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TableTextData: {
    marginTop: 10,
    // marginRight: 3,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    borderWidth: 1,
    borderBottomColor: "grey",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    fontSize: "50px",
    // borderBlockColor: "grey",
  },
  datePicker: {
    backgroundColor: "red",
    color: "red",
  },
});

export default City;
