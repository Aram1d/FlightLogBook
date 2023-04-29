import React from "react";
import {
  Container,
  DefaultMantineColor,
  Group,
  Header as MantineHeader,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import {
  IconBrandGithubCopilot,
  IconPlane,
  IconPlaneDeparture,
} from "@tabler/icons-react";

export const Header = () => (
  <MantineHeader height={60} p="xs">
    <Container w={1000}>
      <Group>
        <HeaderButton
          color="violet"
          icon={<IconPlaneDeparture />}
          label="Vols"
        />
        <HeaderButton
          color="green"
          icon={<IconBrandGithubCopilot />}
          label="Pilotes"
        />
        <HeaderButton color="blue" icon={<IconPlane />} label="Aéronefs" />
      </Group>
    </Container>
  </MantineHeader>
);

type HeaderButtonProps = {
  color: DefaultMantineColor;
  icon: React.ReactNode;
  label: string;
};
export const HeaderButton = ({ color, icon, label }: HeaderButtonProps) => (
  <UnstyledButton
    sx={(t) => ({
      display: "block",
      padding: t.spacing.xs,
      borderRadius: t.radius.sm,
      color: t.colorScheme === "dark" ? t.colors.dark[0] : t.black,

      "&:hover": {
        backgroundColor:
          t.colorScheme === "dark" ? t.colors.dark[6] : t.colors.gray[0],
      },
    })}
  >
    <Group>
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>

      <Text size="sm">{label}</Text>
    </Group>
  </UnstyledButton>
);
