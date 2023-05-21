import { Card, Stack, Title, Text, Grid } from "@mantine/core";
import { useFlightStatsQuery } from "../../api/gqlTypes";
import { timeFormatter } from "../components/DurationInput";

export const FlightStats = () => {
  const [{ data }] = useFlightStatsQuery();

  return (
    <Card>
      <Stack>
        <Title>Récap</Title>
        <Grid columns={3} sx={{ maxWidth: "20rem" }}>
          <Grid.Col span={2}>
            <Text color="dimmed">Total flight time:</Text>{" "}
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>{timeFormatter(data?.flightStats.totalFlightTime)}</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text color="dimmed">Total D.C flight time:</Text>{" "}
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>{timeFormatter(data?.flightStats.totalDC)}</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text color="dimmed">Total P.I.C flight time:</Text>{" "}
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>{timeFormatter(data?.flightStats.totalPIC)}</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text color="dimmed">Flights amount:</Text>{" "}
          </Grid.Col>
          <Grid.Col span={1}>
            <Text>{data?.flightStats.flightAmount}</Text>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
};
