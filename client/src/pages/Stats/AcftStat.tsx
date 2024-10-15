import React, { useState } from "react";
import { Box, Group, Switch, Stack, SegmentedControl } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { ResponsiveBar } from "@nivo/bar";
import { useByAircraftStatsQuery } from "@api";

export const colors = ["#38bcb2", "#eed312", "#f00", "#0f0"];

export const AcftStat = () => {
  const [type, setType] = useState("rad");
  const [mergeByModel, { toggle }] = useDisclosure(false);

  const [{ data }] = useByAircraftStatsQuery();

  return (
    <Group>
      <Stack style={{ minWidth: 200 }}>
        <SegmentedControl
          data={["bar", "rad"]}
          value={type}
          onChange={setType}
        />
        <Switch
          label="Merge by model"
          checked={mergeByModel}
          onChange={toggle}
        />
      </Stack>
      {type === "rad" && (
        <Box style={{ height: 800, flexGrow: 1 }}>
          <ResponsiveRadialBar
            colors={colors}
            data={
              data?.flightStats[
                mergeByModel ? "byAircraftModel" : "byAircraft"
              ].map(acftStats => ({
                id:
                  "aircraft" in acftStats
                    ? `${acftStats.aircraft.model} ${acftStats.aircraft.registration}`
                    : acftStats.aircraftModel,
                data: [
                  { x: "Hours as PIC", y: acftStats.totalPIC / 60 },
                  { x: "Hours as D.C", y: acftStats.totalDC / 60 },
                  { x: "Hours as COPI", y: acftStats.totalCOPI / 60 },
                  {
                    x: "Hours as Instructor",
                    y: acftStats.totalInstructor / 60
                  }
                ]
              })) ?? []
            }
            valueFormat={value => {
              const h = Math.floor(value);
              const min = Math.round((value % 1) * 60);
              return `${h ? `${h}h` : ""} ${min}min`;
            }}
            padding={0.4}
            cornerRadius={2}
            margin={{ top: 40, right: 200, bottom: 40, left: 40 }}
            radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
            circularAxisOuter={{
              tickSize: 5,
              tickPadding: 12,
              tickRotation: 0
            }}
            legends={[
              {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 130,
                translateY: 0,
                itemsSpacing: 6,
                itemDirection: "left-to-right",
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                symbolSize: 18,
                symbolShape: "square",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000"
                    }
                  }
                ]
              }
            ]}
          />
        </Box>
      )}
      {type === "bar" && (
        <Box style={{ height: 800, flexGrow: 1 }}>
          <ResponsiveBar
            valueFormat=">-.2f"
            data={
              data?.flightStats[
                mergeByModel ? "byAircraftModel" : "byAircraft"
              ].map(fltStats => {
                const {
                  id,
                  totalPIC,
                  totalDC,
                  totalCOPI,
                  totalInstructor,
                  ...rest
                } = fltStats;

                return {
                  id:
                    "aircraft" in fltStats
                      ? `${fltStats.aircraft.brand} ${fltStats.aircraft.model} ${fltStats.aircraft.registration}`
                      : fltStats.aircraftModel,
                  PIC: totalPIC / 60,
                  DC: totalDC / 60,
                  COPI: totalCOPI / 60,
                  INSTR: totalInstructor / 60,
                  ...rest,
                  aircraft: 0
                };
              }) ?? []
            }
            keys={["PIC", "DC", "COPI", "INSTR"]}
            indexBy="id"
            margin={{ top: 50, right: 130, bottom: 50, left: 150 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={colors}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Flight time (hours)",
              legendPosition: "middle",
              legendOffset: 32,
              truncateTickAt: 0
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "start",
              legendOffset: -40,
              truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]]
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            role="application"
            ariaLabel="Flight hours by aircraft"
            layout="horizontal"
            enableGridY={false}
            enableGridX={true}
          />
        </Box>
      )}
    </Group>
  );
};
