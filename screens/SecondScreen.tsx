import React from "react";
import { Text, View } from "react-native";
import { BookingSheet } from "../components/BookingSheet";

export default function SecondScreen({ navigation, route }) {
  let language = route.params.language;

  return (
    <View>
      <BookingSheet />
      <Text>2nd Open up App.tsx to start working on your app! {language}</Text>
    </View>
  );
}
