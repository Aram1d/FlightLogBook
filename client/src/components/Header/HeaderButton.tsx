import React from "react";
import { Link } from "react-router-dom";
import {
  Anchor,
  DefaultMantineColor,
  Group,
  Text,
  ThemeIcon
} from "@mantine/core";
import { UrlRoutes } from "@config";

import classes from "./HeaderButton.module.css";

interface HeaderButtonProps {
  color: DefaultMantineColor;
  icon: React.ReactNode;
  label: string;
  to: UrlRoutes | "/";
}

export const HeaderButton = ({ color, icon, label, to }: HeaderButtonProps) => (
  <Anchor component={Link} to={to} className={classes.headerButton}>
    <Group>
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>

      <Text size="sm">{label}</Text>
    </Group>
  </Anchor>
);
