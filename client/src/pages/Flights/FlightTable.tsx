import React, { useMemo } from "react";

import {
  ActionIcon,
  Button,
  Card,
  Group,
  Stack,
  Title,
  Text,
  NumberInput
} from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IconEdit } from "@tabler/icons-react";
import dayjs from "dayjs";
import { OwnFlightsQuery, useOwnFlightsQuery } from "@api";
import { usePagination } from "@hooks";
import { ArrayElement, timeFormatter, EntityTableProps } from "@lib";

type OwnFlight = ArrayElement<OwnFlightsQuery["ownFlights"]["items"]>;
type CumulativeTotals = OwnFlightsQuery["ownFlightsTotals"];

export const FlightTable = ({ setForm }: EntityTableProps) => {
  const [shift, setShift] = React.useState(0);
  const pagination = usePagination();
  const [{ data }] = useOwnFlightsQuery({
    variables: {
      pager: {
        pagination: {
          page: pagination.page,
          limit: pagination.recordsPerPage,
          shift
        }
      }
    }
  });

  const loadedFlights = data?.ownFlights.items && [
    ...data.ownFlights.items,
    data.ownFlightsTotals
  ];

  const columns: DataTableColumn<OwnFlight | CumulativeTotals>[] = useMemo(
    () => [
      {
        accessor: "departure",
        title: "Departure",
        render: handleRender(
          f =>
            `${f.departure.place} ${dayjs(f.departure.date).format(
              "DD.MM.YYYY HH:mm"
            )}`
        )
      },
      {
        accessor: "arrival",
        title: "Arrival",
        render: handleRender(
          f =>
            `${f.arrival.place} ${dayjs(f.arrival.date).format(
              "DD:MM:YYYY HH:mm"
            )}`
        )
      },
      {
        accessor: "aircraft",
        title: "Aircraft",
        render: handleRender(
          f => f.aircraft?.registration,
          () => (
            <Stack>
              <Text>Previous</Text>
              <Text>Page</Text>
              <Text>Cumulated</Text>
            </Stack>
          )
        )
      },
      {
        accessor: "aircraftClass",
        title: "Class",
        render: handleRender(
          f => f.aircraftClass,
          ({ singleEngine, multiEngine }) => (
            <Stack>
              <Text>
                S: {timeFormatter(singleEngine.preceding)} / M:{" "}
                {timeFormatter(multiEngine.preceding)}
              </Text>
              <Text>
                S: {timeFormatter(singleEngine.page)} / M:{" "}
                {timeFormatter(multiEngine.page)}
              </Text>
              <Text>
                S: {timeFormatter(singleEngine.actual)} / M:{" "}
                {timeFormatter(multiEngine.actual)}
              </Text>
            </Stack>
          )
        )
      },
      {
        accessor: "totalFlightTime",
        title: "Total time",
        render: handleRender(
          f => timeFormatter(f.totalFlightTime),
          ({ totalFlightTime }) => (
            <Stack>
              <Text>{timeFormatter(totalFlightTime.preceding)}</Text>
              <Text>{timeFormatter(totalFlightTime.page)}</Text>
              <Text>{timeFormatter(totalFlightTime.actual)}</Text>
            </Stack>
          )
        )
      },
      {
        accessor: "pic",
        title: "PIC",
        render: handleRender(f => `${f.pic.lastName}`)
      },
      {
        accessor: "landings",
        title: "Landings",
        render: handleRender(
          f => `${f.landings.day} D - ${f.landings.night} N `,
          ({ landings }) => (
            <Stack>
              <Text>
                D: {landings.day.preceding} / N: {landings.night.preceding}
              </Text>
              <Text>
                D: {landings.day.page} / N: {landings.night.page}
              </Text>
              <Text>
                D: {landings.day.actual} / N: {landings.night.actual}
              </Text>
            </Stack>
          )
        )
      },
      {
        accessor: "operationalTime",
        title: "Operational time",
        render: handleRender(
          f => `${f.operationalTime.ifr} IFR - ${f.operationalTime.night} Night`
        )
      },
      {
        accessor: "picTime",
        title: "Pic",
        render: handleRender(
          f => timeFormatter(f.pilotFunctionTime.pic),
          ({ pic }) => (
            <Stack>
              <Text>{timeFormatter(pic.preceding)}</Text>
              <Text>{timeFormatter(pic.page)}</Text>
              <Text>{timeFormatter(pic.actual)}</Text>
            </Stack>
          )
        )
      },
      {
        accessor: "copilotTime",
        title: "Cop",
        render: handleRender(
          f => timeFormatter(f.pilotFunctionTime.coPilot),
          ({ copilot }) => (
            <Stack>
              <Text>{timeFormatter(copilot.preceding)}</Text>
              <Text>{timeFormatter(copilot.page)}</Text>
              <Text>{timeFormatter(copilot.actual)}</Text>
            </Stack>
          )
        )
      },
      {
        accessor: "dualCommand",
        title: "D.C.",
        render: handleRender(
          f => timeFormatter(f.pilotFunctionTime.dualCommand),
          ({ dualCommand }) => (
            <Stack>
              <Text>{timeFormatter(dualCommand.preceding)}</Text>
              <Text>{timeFormatter(dualCommand.page)}</Text>
              <Text>{timeFormatter(dualCommand.actual)}</Text>
            </Stack>
          )
        )
      },
      {
        accessor: "Fi",
        title: "F.I.",
        render: handleRender(
          f => timeFormatter(f.pilotFunctionTime.instructor),
          ({ instructor }) => (
            <Stack>
              <Text>{timeFormatter(instructor.preceding)}</Text>
              <Text>{timeFormatter(instructor.page)}</Text>
              <Text>{timeFormatter(instructor.actual)}</Text>
            </Stack>
          )
        )
      },
      {
        accessor: "remarks",
        title: "Remarks",
        render: handleRender(f => `${f.remarks}`)
      },
      {
        accessor: "id",
        title: "Actions",
        render: handleRender(flt => (
          <ActionIcon onClick={() => setForm(flt.id)}>
            <IconEdit />
          </ActionIcon>
        ))
      }
    ],
    [setForm]
  );

  return (
    <Card>
      <Stack>
        <Group gap="apart">
          <Title order={4}>Flights</Title>
          <Button variant="light" onClick={() => setForm("Add")}>
            Add
          </Button>
        </Group>
        <DataTable
          columns={columns}
          records={loadedFlights}
          totalRecords={data?.ownFlights.total}
          recordsPerPageOptions={[10, 11, 12, 13, 14, 20, 50, 100]}
          paginationText={({ from, to, totalRecords }) => (
            <Group>
              {`${from}-${to}/${totalRecords}`}
              <NumberInput
                maw={100}
                size="xs"
                label="shift"
                value={shift}
                onChange={v => setShift(parseInt(v.toString(), 10))}
              />
            </Group>
          )}
          {...pagination}
        />
      </Stack>
    </Card>
  );
};

function handleRender(
  normal: (record: OwnFlight) => React.ReactNode,
  total?: (record: CumulativeTotals) => React.ReactNode
): (record: OwnFlight | CumulativeTotals) => React.ReactNode {
  return (record: OwnFlight | CumulativeTotals) => {
    switch (record.__typename) {
      case "Flight":
        return normal(record);
      case "FlightPageTotals":
        return total?.(record) ?? null;
    }
  };
}
