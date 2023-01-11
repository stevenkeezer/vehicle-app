import React from "react";
import { Text, View } from "react-native";
import { Image } from "tamagui";

export default function DetailScreen({ route }) {
  let carData = route.params.carData;

  console.log(carData, "vehicleId");

  return (
    <View>
      <Image
        src={{
          uri: "https://storage.googleapis.com/support-forums-api/attachment/thread-72140538-14144830147506078782.PNG",
        }}
        width="100%"
        height="20%"
      />

      <Text>
        2nd Open up App.tsx to start working on your app! {carData.car}
      </Text>
    </View>
  );
}
