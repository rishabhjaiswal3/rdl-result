import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { convertTo12HourFormat } from "../service/service";
const { width } = Dimensions.get("window"); // Get the screen width
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Card = ({ imageSource, col, data }) => {
  const navigation = useNavigation();

  const { title, timesList, values, id } = data;

  const previousDate = timesList[timesList.length - 2] ?? "##";
  const previousValue = values[timesList.length - 2] ?? "##";
  const currentDate = timesList[timesList.length - 1] ?? "##";

  return (
    <View
      onTouchEndCapture={(data) => {
        navigation.navigate("city", {
          cityData: { id, title },
        });
      }}
      style={{
        width: 100 / col + "%",
        position: "relative", // Parent container needs relative positioning
      }}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: imageSource }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{previousValue}</Text>
          <Text style={styles.normalText}>{title}</Text>
          <Text style={styles.normalText}>
            {convertTo12HourFormat(previousDate)}
          </Text>
          <Text style={styles.stripText}>
            Next Results : {convertTo12HourFormat(currentDate)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    height: 130,
    width: width / 2 - 20, // Calculate width based on screen width and desired margins
    backgroundColor: "#FEC200",
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
  },
  cardImage: {
    height: "100%", // Cover the entire container height
    width: "100%", // Cover the entire container width
  },
  textContainer: {
    alignContent: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  cardTitle: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
  },
  normalText: {
    textAlign: "center",
    color: "white",
    marginBottom: 2,
  },
  stripText: {
    backgroundColor: "#FEC200",
    textAlign: "center",
    marginBottom: 4,
    marginHorizontal: 3,
    // margin: 2,
    // marginTop: 2,
  },
  cardDescription: {
    color: "#555",
    marginTop: 5,
  },
});

export default Card;
