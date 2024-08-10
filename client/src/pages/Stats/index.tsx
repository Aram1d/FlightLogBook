import React from "react";
import { Card, Group, Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFlightStatsQuery,
  useLast3MonthsStatsQuery,
} from "../../api/gqlTypes";
import { FlightsSummary } from "./FlightsSummary";
import { AcftStat } from "./AcftStat";
import { DcStats } from "./DcStats";

export const FlightStats = () => {
  const navigate = useNavigate();
  const { tabId } = useParams();
  const [{ data }] = useFlightStatsQuery();
  const [{ data: last3Months }] = useLast3MonthsStatsQuery();

  return (
    <Card>
      <Tabs
        value={tabId ?? "sum"}
        onTabChange={(tabId) =>
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
              stats={last3Months?.last3MonthsFlightStats}
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
