import { Box, Group } from "@mantine/core";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { useByInstructorStatsQuery } from "@api";

export const DcStats = () => {
  const [{ data }] = useByInstructorStatsQuery();

  return (
    <Group>
      <Box style={{ height: 800, flexGrow: 1 }}>
        <ResponsiveCirclePacking
          labelComponent={({ node }) => (
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontFamily="sans-serif"
              style={{
                fill: node.parent?.color,
                outlineWidth: "0px",
                outlineColor: "transparent",
              }}
            >
              {node.id.match(/(?<= with ).*/)?.[0] ?? node.id}
            </text>
          )}
          data={{
            name: "All",
            color: "hsl(227,70%,50%)",
            children:
              data?.flightStats.byInstructor.map((byInstructor) => {
                if (byInstructor.byAircraftModel.length < 2) {
                  const aircrafts = byInstructor.byAircraftModel[0].byAircraft;

                  if (aircrafts.length < 2) {
                    const { model, registration } = aircrafts[0].aircraft;
                    return {
                      name: `${model} ${registration} with ${byInstructor.instructor.lastName}`,
                      hours: aircrafts[0].totalDC / 60,
                    };
                  }

                  return {
                    name: `${byInstructor.instructor.lastName}`,
                    color: "hsl(168, 70%, 50%)",
                    children: aircrafts.map((acft) => ({
                      name: `${acft.aircraft.model} ${acft.aircraft.registration}`,
                      color: "hsl(84, 70%, 50%)",
                      hours: acft.totalDC / 60,
                    })),
                  };
                }

                return {
                  name: byInstructor.instructor.lastName,
                  color: "hsl(333, 70%, 50%)",
                  children: byInstructor.byAircraftModel.map((acftModel) => {
                    if (acftModel.byAircraft?.length < 2) {
                      const { model, registration } =
                        acftModel.byAircraft[0].aircraft;

                      return {
                        name: `${model} ${registration} with ${byInstructor.instructor.lastName}`,
                        hours: acftModel.totalDC / 60,
                      };
                    }

                    return {
                      name: `${byInstructor.instructor.lastName} ${acftModel.aircraftModel} `,
                      color: "hsl(168, 70%, 50%)",
                      children: acftModel.byAircraft?.map((acft) => ({
                        name: `${byInstructor.instructor.lastName} ${acft.aircraft.model} ${acft.aircraft.registration}`,
                        color: "hsl(84, 70%, 50%)",
                        hours: acft.totalDC / 60,
                      })),
                    };
                  }),
                };
              }) ?? [],
          }}
          valueFormat={(value) => {
            const h = Math.floor(value);
            const min = Math.round((value % 1) * 60);
            return `${h ? `${h}h` : ""} ${min}min`;
          }}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          id="name"
          value="hours"
          //colors={["#F7A072", "#0FA3B1", "#B5E2FA", "#EDDEA4"]}
          childColor={{
            from: "color",
            modifiers: [["brighter", 0.4]],
          }}
          padding={4}
          enableLabels={true}
          labelsFilter={(n) => n.node.depth === 1}
          labelsSkipRadius={10}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.5]],
          }}
          defs={[
            {
              id: "lines",
              type: "patternLines",
              background: "none",
              color: "inherit",
              rotation: -45,
              lineWidth: 5,
              spacing: 8,
            },
          ]}
        />
      </Box>
    </Group>
  );
};
