import React from "react";

import { Container, Group, AppShell } from "@mantine/core";
import {
  IconBrandGithubCopilot,
  IconChartDots,
  IconPlane,
  IconPlaneDeparture
} from "@tabler/icons-react";
import { UrlRoutes } from "@config";
import { HeaderButton, UserMenu } from "@components";
import { useHideOverflow } from "@hooks";
import { MAX_WIDTH } from "@layouts";
import { cn } from "@lib";
import classes from "./index.module.css";

export const Header = () => {
  const headerBtns = [];

  const { ref, shownItems } = useHideOverflow({
    gap: 16,
    deps: [headerBtns.length]
  });
  console.log(shownItems); //eslint-disable-line no-console

  return (
    <AppShell.Header p="xs">
      <Container
        maw={MAX_WIDTH}
        component={Group}
        h="100%"
        className={classes.container}
      >
        <Group ref={ref} flex={10} className={classes.collapsibleContainer}>
          <HeaderButton
            color="indigo"
            icon={<IconChartDots />}
            label="Home"
            key="home"
            to="/"
            className={cn(shownItems < 1 && classes.collapsible)}
          />
          <HeaderButton
            color="violet"
            icon={<IconPlaneDeparture />}
            label="Flights"
            key="flights"
            to={UrlRoutes.flights}
            className={cn(shownItems < 2 && classes.collapsible)}
          />
          <HeaderButton
            color="green"
            icon={<IconBrandGithubCopilot />}
            label="Pilots"
            key="pilots"
            to={UrlRoutes.pilots}
            className={cn(shownItems < 3 && classes.collapsible)}
          />
          <HeaderButton
            color="blue"
            icon={<IconPlane />}
            label="Aircrafts"
            key="aircrafts"
            to={UrlRoutes.aircrafts}
            className={cn(shownItems < 4 && classes.collapsible)}
          />
        </Group>
        <Group>
          <UserMenu />
        </Group>
      </Container>
    </AppShell.Header>
  );
};
