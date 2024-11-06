import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Group, Tabs } from "@mantine/core";
import dayjs from "dayjs";
import { FlightsSummary } from "./FlightsSummary";
import { AcftStat } from "./AcftStat";
import { DcStats } from "./DcStats";
import { useFlightStatsQuery, useFromDateFlightStatsQuery } from "@api";

export const FlightStats = () => {
  const [{ lastMonthDate, last3MonthsDate }] = useState(() => {
    const today = dayjs();
    return {
      lastMonthDate: today.subtract(3, "months").toDate(),
      last3MonthsDate: today.subtract(1, "month").toDate()
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

  return (
    <Card>
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
          <Group>
            <FlightsSummary stats={data?.flightStats} title="Global Summary" />
            <FlightsSummary
              stats={lastMonth?.fromDateFlightStats}
              title="Last month"
            />
            <FlightsSummary
              stats={last3Months?.fromDateFlightStats}
              title="Last 3 months"
            />
          </Group>
        </Tabs.Panel>
        <Tabs.Panel value="dc">
          <DcStats />
        </Tabs.Panel>
        <Tabs.Panel value="acft">
          <AcftStat />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
};
