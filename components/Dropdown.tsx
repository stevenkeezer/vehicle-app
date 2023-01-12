import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import {
  Adapt,
  LinearGradient,
  Select,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";

export function Dropdown({ val, setVal, data, label }) {
  return (
    <XStack $sm={{ flexDirection: "column" }}>
      <Text pb="$2">{label}</Text>
      <Select id={label} value={val} onValueChange={setVal}>
        <Select.Trigger w={180}>
          <Select.Value placeholder="something" />
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet modal dismissOnSnapToBottom>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200_000}>
          <Select.ScrollUpButton
            ai="center"
            jc="center"
            pos="relative"
            w="100%"
            h="$3"
          >
            <YStack zi={10}>{/* <ChevronUp size={20} /> */}</YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["$background", "$backgroundTransparent"]}
              br="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <Select.Group>
              <Select.Label>{label}</Select.Label>
              {data?.map((item, i) => {
                return (
                  <Select.Item
                    index={i}
                    key={item.name}
                    value={item.name.toLowerCase()}
                  >
                    <Select.ItemText>{item.name}</Select.ItemText>
                    <Select.ItemIndicator ml="auto">
                      {/* <Check size={16} /> */}
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton
            ai="center"
            jc="center"
            pos="relative"
            w="100%"
            h="$3"
          >
            <YStack zi={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={["$backgroundTransparent", "$background"]}
              br="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </XStack>
  );
}
