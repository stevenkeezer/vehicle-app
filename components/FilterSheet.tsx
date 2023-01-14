import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { Button, Text, XStack, YStack } from "tamagui";
import { Dropdown } from "./Dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { colors, makes, years } from "../consts/filters";

export const FilterSheet = ({
  open,
  setOpen,
  make,
  setMake,
  year,
  setYear,
  color,
  setColor,
  clearFilters,
}) => {
  const [position, setPosition] = useState(0);
  const [modal, setModal] = useState(true);

  return (
    <Sheet
      forceRemoveScrollEnabled={open}
      modal={modal}
      open={open}
      onOpenChange={setOpen}
      snapPoints={[70]}
      dismissOnSnapToBottom
      position={position}
      onPositionChange={setPosition}
      zIndex={100000}
    >
      <Sheet.Overlay style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
      <Sheet.Handle />
      <Sheet.Frame
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        f={1}
        p="$4"
        space="$5"
      >
        <XStack
          ai="flex-end"
          space="$2"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Text fontSize={16} fontWeight="semibold">
            Filters
          </Text>

          <Button circular bg="transparent" onPress={() => setOpen(false)}>
            <FontAwesome name="times" color="gray" size={24} />
          </Button>
        </XStack>

        <YStack
          h={Dimensions.get("screen").height / 1.9}
          space="$5"
          jc="space-between"
        >
          <XStack space="$1" jc="space-between" flexWrap="wrap">
            <Dropdown val={year} setVal={setYear} data={years} label="Year" />
            <Dropdown val={make} setVal={setMake} data={makes} label="Make" />
            <XStack pt="$2">
              <Dropdown
                val={color}
                setVal={setColor}
                data={colors}
                label="Color"
              />
            </XStack>
          </XStack>

          <XStack space="$3" jc="space-between">
            <Button
              borderColor="#2373f1"
              color="#2373f1"
              bc="transparent"
              w="48%"
              onPress={clearFilters}
            >
              Clear Filters
            </Button>
            <Button
              color="white"
              fontWeight="semibold"
              onPress={() => setOpen(false)}
              bc="#2373f1"
              w="48%"
            >
              Done
            </Button>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};
