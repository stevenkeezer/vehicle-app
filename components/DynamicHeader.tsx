import * as React from "react";
import { StyleSheet, Animated } from "react-native";
import { Button, Input, Text, XStack } from "tamagui";

const Header_Max_Height = 124;
const Header_Min_Height = 68;

export default function DynamicHeader({
  animHeaderValue,
  setOpenFilters,
  setSearchTerm,
  filters,
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
          paddingBottom: 12,
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
      <XStack px="$3" space="$2">
        <Button
          size="$4"
          style={{ borderRadius: 100 }}
          onPress={() => setOpenFilters(true)}
        >
          Go
        </Button>
        {filters.map((filter) => {
          if (!filter) return null;
          return (
            <Button style={{ borderRadius: 100 }} size="$4">
              <Text>{filter}</Text>
            </Button>
          );
        })}
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
    borderBottomColor: "#D0D0D0",
    overflow: "hidden",
    borderBottomWidth: 1,
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
