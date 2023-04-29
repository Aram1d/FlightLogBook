import { Box, Card, Group, Select, Stack, Title } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { IconArrowBigRightLines } from "@tabler/icons-react";

type FlightRecordFormProps = { children: React.ReactNode };
const FlightRecordTitle = ({ children, ...rest }: FlightRecordFormProps) => (
  <Title order={4} {...rest}>
    {children}
  </Title>
);

export const FlightRecordForm = () => {
  return (
    <Card sx={{ overflow: "visible" }}>
      <Stack>
        <Group sx={{ alignItems: "stretch" }}>
          <Stack>
            <FlightRecordTitle>Départ</FlightRecordTitle>
            <Select
              label="Lieu"
              placeholder="OCAI code"
              data={[]}
              searchable
              creatable
              getCreateLabel={(ocai) => `Add ${ocai}`}
            />
            <TimeInput label="Heure" />
          </Stack>

          <Box sx={{ flexGrow: 1 }}>
            <Stack sx={{ maxWidth: "10rem" }} m="auto">
              <FlightRecordTitle>Date</FlightRecordTitle>
              <DatePickerInput label="Date" />
              <IconArrowBigRightLines />
            </Stack>
          </Box>
          <Stack>
            <FlightRecordTitle>Arrivée</FlightRecordTitle>
            <Select
              label="Lieu"
              placeholder="OCAI code"
              data={[]}
              searchable
              creatable
              getCreateLabel={(ocai) => `Add ${ocai}`}
            />
            <TimeInput label="Heure" />
          </Stack>
          <Stack>
            <FlightRecordTitle>Aéronef</FlightRecordTitle>
            <Select label="modèle" data={[]} />
            <Select label="immatriculation" data={[]} />
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};
