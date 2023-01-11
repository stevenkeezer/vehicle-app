import { Sheet } from "@tamagui/sheet";
import { useState } from "react";
import { Button, XStack } from "tamagui";

export const FilterSheet = ({ navigation, open, setOpen }) => {
  const [position, setPosition] = useState(0);
  const [modal, setModal] = useState(true);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <>
      <XStack space>
        <Button onPress={() => setOpen(true)}>Open</Button>
        <Button onPress={() => setModal((x) => !x)}>
          {modal ? "Type: Modal" : "Type: Inline"}
        </Button>
      </XStack>

      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[75]}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
      >
        <Sheet.Handle />
        <Sheet.Frame
          style={{ borderTopLeftRadius: 30, borderTopRightRadius: 20 }}
          f={1}
          p="$4"
          space="$5"
        >
          <Button onPress={() => navigation.navigate("Home")}>Book Now</Button>
          <Button size="$6" circular onPress={() => setOpen(false)} />
          <Button
            size="$6"
            circular
            onPress={() => setInnerOpen(true)}
          ></Button>
        </Sheet.Frame>
      </Sheet>
    </>
  );
};
