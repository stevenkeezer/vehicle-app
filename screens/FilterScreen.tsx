import React from "react";
import { Text, View } from "react-native";
import { Button, Image } from "tamagui";
import { BookingSheet } from "../components/BookingSheet";

export default function FilterScreen({ navigation, route }) {
  let language = route.params.language;

  return (
    <View>
      <Image
        src={{
          uri: "https://storage.googleapis.com/support-forums-api/attachment/thread-72140538-14144830147506078782.PNG",
        }}
        width="100%"
        height="80%"
      />
      <BookingSheet navigation={navigation} />
      <Text>2nd Open up App.tsx to start working on your app! {language}</Text>
    </View>
  );
}
