import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Text,
  Title,
  Card,
  SimpleGrid
} from "@mantine/core";

import { IconPlane, IconUser } from "@tabler/icons-react";
import { UrlRoutes } from "@config";

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
    icon: IconPlane,
    title: "Aircrafts",
    description: "Manage aircraft details and maintenance logs."
  }
];

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title mt={50}>Welcome to Your Flight Log App</Title>
      <Text align="center" c="dimmed" size="lg" mt="md">
        Maintain your aircraft logbook effortlessly.
      </Text>

      <SimpleGrid cols={3} mt={50}>
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
        <Button
          onClick={() => navigate(UrlRoutes.signin)}
          size="lg"
          variant="filled"
          color="blue"
          mr="md"
        >
          Log In
        </Button>
        <Button
          onClick={() => navigate(UrlRoutes.signup)}
          size="lg"
          variant="outline"
          color="blue"
        >
          Sign Up
        </Button>
      </div>
    </Container>
  );
};
