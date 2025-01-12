import React, { useState } from "react";
import { Link } from "react-router";
import {
  Container,
  Group,
  AppShell,
  Menu,
  ActionIcon,
  rem
} from "@mantine/core";
import {
  IconBrandGithubCopilot,
  IconChartDots,
  IconDots,
  IconPlane,
  IconPlaneDeparture
} from "@tabler/icons-react";
import { UrlRoutes } from "../../config/routes";
import { drop } from "lodash-es";
import { HeaderButton, UserMenu } from "@components";
import { useHideOverflow } from "@hooks";
import { MAX_WIDTH } from "@layouts";
import { cn } from "@lib";
import classes from "./index.module.css";

export const Header = () => {
  const [menuSource] = useState([
    {
      to: "/",
      label: "Home",
      Icon: IconChartDots,
      color: "indigo",
      key: "home"
    },
    {
      to: UrlRoutes.flights,
      label: "Flights",
      Icon: IconPlaneDeparture,
      color: "violet",
      key: "flights"
    },
    {
      to: UrlRoutes.pilots,
      label: "Pilots",
      Icon: IconBrandGithubCopilot,
      color: "green",
      key: "pilots"
    },
    {
      to: UrlRoutes.aircrafts,
      label: "Aircrafts",
      Icon: IconPlane,
      color: "blue",
      key: "aircrafts"
    }
  ] as const);

  const { ref, shownItems } = useHideOverflow({
    gap: 16,
    deps: []
  });

  return (
    <AppShell.Header p="xs">
      <Container
        maw={MAX_WIDTH}
        component={Group}
        h="100%"
        className={classes.container}
      >
        <Group ref={ref} className={classes.collapsibleContainer} flex={10}>
          {menuSource.map(({ key, Icon, ...props }, i) => (
            <HeaderButton
              {...props}
              icon={<Icon />}
              key={key}
              className={cn(shownItems <= i && classes.collapsed)}
            />
          ))}

          <Menu position="bottom-start">
            <Menu.Target>
              <ActionIcon
                variant="light"
                size="md"
                className={cn(
                  classes.moreDropdownTrigger,
                  shownItems > 3 && classes.collapsed
                )}
              >
                <IconDots />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {drop(menuSource, shownItems).map(({ key, Icon, ...props }) => (
                <Menu.Item
                  component={Link}
                  {...props}
                  leftSection={
                    <Icon style={{ width: rem(14), height: rem(14) }} />
                  }
                  key={key}
                >
                  {props.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Group>
          <UserMenu />
        </Group>
      </Container>
    </AppShell.Header>
  );
};
