import * as React from "react";
import { StyleSheet, Animated } from "react-native";
import { Button, Input, XStack } from "tamagui";

const Header_Max_Height = 120;
const Header_Min_Height = 68;

export default function DynamicHeader({
  animHeaderValue,
  setOpenFilters,
  setSearchTerm,
}) {
  const animateHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: "clamp",
  });

  const animateHeaderPadding = animHeaderValue.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [10, 10],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: animateHeaderHeight,
          paddingTop: animateHeaderPadding,
        },
      ]}
    >
      <XStack
        style={{
          display: "flex",
          paddingHorizontal: 15,
          paddingBottom: 15,
        }}
        ai="center"
        space="$2"
      >
        <Input
          f={1}
          size="$4"
          placeholder="Search"
          bc="#f2f2f7"
          onChangeText={(text) => setSearchTerm(text)}
        />
      </XStack>
      <XStack>
        <Button
          size="$4"
          onPress={() => setOpenFilters(true)}
          style={{
            position: "absolute",
          }}
        >
          Go
        </Button>
      </XStack>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    left: 0,
    right: 0,
    paddingTop: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
