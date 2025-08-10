import { ReactNode, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Title, Tabs, Text, Skeleton } from "@mantine/core";
import dayjs from "dayjs";
import { AcftStat } from "./AcftStat";
import { DcStats } from "./DcStats";
import {
  FlightStatsQuery,
  useFlightStatsQuery,
  useFromDateFlightStatsQuery
} from "@api";
import { timeFormatter } from "@lib";

export const FlightStats = () => {
  const [{ lastMonthDate, last3MonthsDate, lastYearDate }] = useState(() => {
    const today = dayjs();
    return {
      lastMonthDate: today.subtract(1, "months").toDate(),
      last3MonthsDate: today.subtract(3, "month").toDate(),
      lastYearDate: today.subtract(1, "year").toDate()
    };
  });

  const navigate = useNavigate();
  const { tabId } = useParams();
  const [{ data }] = useFlightStatsQuery();

  const [{ data: lastMonth }] = useFromDateFlightStatsQuery({
    variables: { date: lastMonthDate }
  });

  const [{ data: last3Months }] = useFromDateFlightStatsQuery({
    variables: { date: last3MonthsDate }
  });

  const [{ data: lastYear }] = useFromDateFlightStatsQuery({
    variables: { date: lastYearDate }
  });

  return (
    <Tabs
      value={tabId ?? "sum"}
      onChange={tabId =>
        navigate(
          "/" + (["sum", "dc", "acft"].includes(tabId || "") ? tabId : "sum")
        )
      }
    >
      <Tabs.List>
        <Tabs.Tab value="sum">Summary</Tabs.Tab>
        <Tabs.Tab value="dc">DC stats</Tabs.Tab>
        <Tabs.Tab value="acft">Acft stats</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="sum">
        <Box
          mt="md"
          maw={800}
          style={{
            display: "grid",
            gridColumn: 5,
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: "1rem"
          }}
        >
          <Box />
          <Title order={5}>Global</Title>
          <Title order={5}>Last month</Title>
          <Title order={5}>Last 3 months</Title>
          <Title order={5}>Last year</Title>
          {generateStats(
            data?.flightStats,
            lastMonth?.fromDateFlightStats,
            last3Months?.fromDateFlightStats,
            lastYear?.fromDateFlightStats
          )}
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="dc">
        <DcStats />
      </Tabs.Panel>
      <Tabs.Panel value="acft">
        <AcftStat />
      </Tabs.Panel>
    </Tabs>
  );
};

function generateStats(
  ..._stats: (FlightStatsQuery["flightStats"] | undefined)[]
) {
  const stats: [ReactNode[], ReactNode[], ReactNode[], ReactNode[]] = [
    [],
    [],
    [],
    []
  ];
  _stats.forEach((s,i) => {
    if (s) {
      stats[0].push(<Text key={i}>{timeFormatter(s.totalFlightTime)}</Text>);
      stats[1].push(<Text key={i}>{timeFormatter(s.totalDC)}</Text>);
      stats[2].push(<Text key={i}>{timeFormatter(s.totalPIC)}</Text>);
      stats[3].push(<Text key={i}>{s.flightAmount}</Text>);
    } else stats.forEach(s => s.push(<Skeleton key={i} />));
  });

  return (
    <>
      <Text c="dimmed">Total flight time:</Text>
      {stats[0]}
      <Text c="dimmed">Total D.C flight time:</Text>
      {stats[1]}
      <Text c="dimmed">Total P.I.C flight time:</Text>
      {stats[2]}
      <Text c="dimmed">Flights amount:</Text>
      {stats[3]}
    </>
  );
}
