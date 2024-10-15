import React from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  Box,
  Container,
  DefaultMantineColor,
  Group,
  Header as MantineHeader,
  HeaderProps,
  Text,
  ThemeIcon
} from "@mantine/core";
import {
  IconBrandGithubCopilot,
  IconChartDots,
  IconPlane,
  IconPlaneDeparture
} from "@tabler/icons-react";
import { UrlRoutes } from "@config";
import { UserMenu } from "@components";
import { MAX_WIDTH } from "@layouts";

export const Header = (props: Omit<HeaderProps, "children">) => (
  <MantineHeader height={props.height} p="xs">
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
        <Box sx={{ flexGrow: 1 }} />
        <UserMenu />
      </Group>
    </Container>
  </MantineHeader>
);

type HeaderButtonProps = {
  color: DefaultMantineColor;
  icon: React.ReactNode;
  label: string;
  to: UrlRoutes | "/";
};
export const HeaderButton = ({ color, icon, label, to }: HeaderButtonProps) => (
  <Anchor
    component={Link}
    to={to}
    sx={t => ({
      display: "block",
      padding: t.spacing.xs,
      borderRadius: t.radius.sm,
      color: t.colorScheme === "dark" ? t.colors.dark[0] : t.black,

      "&:hover": {
        backgroundColor:
          t.colorScheme === "dark" ? t.colors.dark[6] : t.colors.gray[0]
      }
    })}
  >
    <Group>
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>

      <Text size="sm">{label}</Text>
    </Group>
  </Anchor>
);
