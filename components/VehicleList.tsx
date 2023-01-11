import React from "react";
import { ListItem, Separator, XStack, YGroup } from "tamagui";

export function VehicleList() {
  return (
    <XStack $sm={{ flexDirection: "column" }} space>
      <ListItemDemo2 />
    </XStack>
  );
}

function ListItemDemo2() {
  return (
    <YGroup als="center" bordered w="100%" size="$5" separator={<Separator />}>
      <ListItem
        hoverTheme
        pressTheme
        title="Star"
        subTitle="Subtitle"
        // icon={Star}
        // iconAfter={ChevronRight}
      />
      <ListItem
        hoverTheme
        pressTheme
        title="Moon"
        subTitle="Subtitle"
        // icon={Moon}
        // iconAfter={ChevronRight}
      />
    </YGroup>
  );
}
