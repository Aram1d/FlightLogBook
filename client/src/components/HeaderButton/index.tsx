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
import { cn } from "@lib";

import classes from "./HeaderButton.module.css";

interface HeaderButtonProps {
  color: DefaultMantineColor;
  icon: React.ReactNode;
  label: string;
  to: UrlRoutes | "/";
  className?: string;
}

export const HeaderButton = ({
  color,
  icon,
  label,
  to,
  className
}: HeaderButtonProps) => (
  <Anchor
    component={Link}
    to={to}
    className={cn(classes.headerButton, className)}
  >
    <Group wrap="nowrap">
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>

      <Text size="sm">{label}</Text>
    </Group>
  </Anchor>
);
