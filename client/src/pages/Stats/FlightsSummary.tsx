import { Grid, Skeleton, Stack, Text, Title } from "@mantine/core";
import { timeFormatter } from "../components/DurationInput";
import { FlightStats } from "../../api/gqlTypes";

type FlightsSummaryProps = {
  stats?: Pick<
    FlightStats,
    "totalFlightTime" | "totalPIC" | "totalDC" | "flightAmount"
  >;
  title: React.ReactNode;
};

export const FlightsSummary = ({ stats, title }: FlightsSummaryProps) => {
  return (
    <Stack>
      <Title>{title}</Title>
      <Grid columns={3} sx={{ maxWidth: "20rem" }}>
        <Grid.Col span={2}>
          <Text color="dimmed">Total flight time:</Text>{" "}
        </Grid.Col>
        <Grid.Col span={1}>
          {stats ? (
            <Text>{timeFormatter(stats.totalFlightTime)}</Text>
          ) : (
            <Skeleton />
          )}
        </Grid.Col>
        <Grid.Col span={2}>
          <Text color="dimmed">Total D.C flight time:</Text>{" "}
        </Grid.Col>
        <Grid.Col span={1}>
          {stats ? <Text>{timeFormatter(stats.totalDC)}</Text> : <Skeleton />}
        </Grid.Col>
        <Grid.Col span={2}>
          <Text color="dimmed">Total P.I.C flight time:</Text>{" "}
        </Grid.Col>
        <Grid.Col span={1}>
          {stats ? <Text>{timeFormatter(stats?.totalPIC)}</Text> : <Skeleton />}
        </Grid.Col>
        <Grid.Col span={2}>
          <Text color="dimmed">Flights amount:</Text>{" "}
        </Grid.Col>
        <Grid.Col span={1}>
          {stats ? <Text>{stats?.flightAmount}</Text> : <Skeleton />}
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
