import * as React from "react";
import { StyleSheet, Animated } from "react-native";
import { Button, Text, XStack, Input } from "tamagui";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Header_Max_Height = 104;
const Header_Min_Height = 68;

export default function DynamicHeader({
  animHeaderValue,
  setOpenFilters,
  setSearchTerm,
  searchTerm,
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

  const tabs = ["Nearby", "SUVs", "Bike"];

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
        }}
        ai="center"
        space="$1"
      >
        <Input
          f={1}
          size="$4"
          borderWidth={0}
          placeholder="Search..."
          placeholderTextColor="gray"
          br="$2"
          bg="#f8f8f8"
          pl="$7"
          onChangeText={(text) => setSearchTerm(text)}
        />
        <FontAwesome
          name="search"
          size={19}
          color="lightgray"
          style={{ position: "absolute", left: 28, top: 12 }}
        />

        <Button
          size="$4"
          br="$2"
          ml="$2"
          bg="#f8f8f8"
          onPress={() => setOpenFilters(true)}
        >
          <Ionicons name="filter" size={18} color="gray" />
        </Button>
      </XStack>

      <XStack px="$3" space="$3" pt="$3">
        <Button pb="$2" size="$3" px="$2" br="$3" bg="white">
          <Text color="gray" fontWeight="bold">
            All
          </Text>
        </Button>

        <Button
          size="$3"
          br="$0"
          bg="white"
          px="$2"
          pb="$2"
          style={{ borderBottomWidth: 2, borderBottomColor: "#2373f1" }}
        >
          <Text color="#2373f1" fontWeight="bold">
            Available (10)
          </Text>
        </Button>

        {tabs.map((tab) => (
          <Button key={tab} px="$1.5" size="$3" br="$0" bg="white" pb="$2">
            <Text color="gray" fontWeight="bold">
              {tab}
            </Text>
          </Button>
        ))}
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
  },
  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});
