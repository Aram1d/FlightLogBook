import React from "react";

import { Box, Container, Group, AppShell } from "@mantine/core";
import {
  IconBrandGithubCopilot,
  IconChartDots,
  IconPlane,
  IconPlaneDeparture
} from "@tabler/icons-react";
import { HeaderButton } from "./HeaderButton";
import { UrlRoutes } from "@config";
import { UserMenu } from "@components";
import { MAX_WIDTH } from "@layouts";

export const Header = () => (
  <AppShell.Header p="xs">
    <Container maw={MAX_WIDTH}>
      <Group>
        <HeaderButton
          color="indigo"
          icon={<IconChartDots />}
          label="Home"
          to="/"
        />
        <HeaderButton
          color="violet"
          icon={<IconPlaneDeparture />}
          label="Flights"
          to={UrlRoutes.flights}
        />
        <HeaderButton
          color="green"
          icon={<IconBrandGithubCopilot />}
          label="Pilots"
          to={UrlRoutes.pilots}
        />

        <HeaderButton
          color="blue"
          icon={<IconPlane />}
          label="Aircrafts"
          to={UrlRoutes.aircrafts}
        />
        <Box style={{ flexGrow: 1 }} />
        <UserMenu />
      </Group>
    </Container>
  </AppShell.Header>
);
