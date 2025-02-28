import {
  Button,
  Container,
  Text,
  Title,
  Card,
  SimpleGrid
} from "@mantine/core";
import { IconPlane, IconUser, IconAirplane } from "@tabler/icons-react";

const features = [
  {
    icon: IconPlane,
    title: "Flights",
    description: "Track and manage all your flights with ease."
  },
  {
    icon: IconUser,
    title: "Pilots",
    description: "Keep records of pilots and their flight history."
  },
  {
    icon: IconAirplane,
    title: "Aircrafts",
    description: "Manage aircraft details and maintenance logs."
  }
];

export default function UnloggedHomePage() {
  return (
    <Container>
      <Title align="center" mt={50}>
        Welcome to Your Flight Log App
      </Title>
      <Text align="center" color="dimmed" size="lg" mt="md">
        Track flights, manage pilots, and maintain aircraft records
        effortlessly.
      </Text>

      <SimpleGrid cols={3} mt={50} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {features.map(feature => (
          <Card shadow="md" padding="lg" radius="md" key={feature.title}>
            <feature.icon size={40} stroke={1.5} />
            <Title order={3} mt="sm">
              {feature.title}
            </Title>
            <Text color="dimmed">{feature.description}</Text>
          </Card>
        ))}
      </SimpleGrid>

      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Button size="lg" variant="filled" color="blue" mr="md">
          Log In
        </Button>
        <Button size="lg" variant="outline" color="blue">
          Sign Up
        </Button>
      </div>
    </Container>
  );
}
