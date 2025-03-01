import { useMemo } from "react";

import { ActionIcon, Stack, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import dayjs from "dayjs";
import classes from "@components/DataTable/TableRow.module.css";
import { AircraftClass, OwnFlightsQuery, useOwnFlightsQuery } from "@api";
import { DataTable, DataTableColumn, DataTableFooterColumn } from "@components";
import { useBreakpoint, usePagination } from "@hooks";
import { ArrayElement, timeFormatter, EntityTableProps, cn } from "@lib";

type OwnFlight = ArrayElement<OwnFlightsQuery["ownFlights"]["items"]>;
type CumulativeTotals = OwnFlightsQuery["ownFlightsTotals"];

export const FlightTable = ({ setForm }: EntityTableProps) => {
  const [pagination, getPg] = usePagination({
    pageSizes: [10, 12, 20, 50, 100],
    shift: 0
  });
  const [{ data, fetching }] = useOwnFlightsQuery({
    variables: {
      pager: {
        pagination
      }
    }
  });

  const loadedFlights = data?.ownFlights.items ?? [];

  const smallScreen = useBreakpoint({ narrower: "xl" });

  const columns: DataTableColumn<OwnFlight>[] = useMemo(
    () => [
      {
        title: "Departure",
        render: f =>
          `${f.departure.place} ${dayjs(f.departure.date).format(
            `DD.MM.${smallScreen ? "YY" : "YYYY"} HH:mm`
          )}`
      },
      {
        title: "Arrival",
        render: f =>
          `${f.arrival.place} ${dayjs(f.arrival.date).format(
            `DD.MM.${smallScreen ? "YY" : "YYYY"} HH:mm`
          )}`
      },
      {
        title: "Aircraft",
        render: f => f.aircraft?.registration
      },
      {
        title: "Class",
        render: f => AcClassMap[f.aircraftClass]
      },
      {
        title: smallScreen ? "TT" : "Total time",
        render: f => timeFormatter(f.totalFlightTime)
      },
      {
        title: "PIC",
        render: f => (smallScreen ? f.pic.username : f.pic.lastName)
      },
      {
        title: "Landings",
        render: f => `${f.landings.day} D - ${f.landings.night} N `
      },
      {
        title: smallScreen ? "Op. time" : "Operational time",
        render: f =>
          `${f.operationalTime.ifr} ${smallScreen ? "I" : "IFR"} - ${f.operationalTime.night} ${smallScreen ? "N" : "Night"} `
      },
      {
        title: "Pic",
        render: f => timeFormatter(f.pilotFunctionTime.pic)
      },
      {
        title: "Cop",
        render: f => timeFormatter(f.pilotFunctionTime.coPilot)
      },
      {
        title: "D.C.",
        render: f => timeFormatter(f.pilotFunctionTime.dualCommand)
      },
      {
        title: "F.I.",
        render: f => timeFormatter(f.pilotFunctionTime.instructor)
      },
      {
        title: "Remarks",
        render: f => `${f.remarks}`,
        maw: "100px",
        style: {
          overflow: "hidden",
          textWrap: "nowrap",
          textOverflow: "ellipsis"
        }
      },
      {
        render: flt => (
          <ActionIcon variant="subtle" onClick={() => setForm(flt.id)}>
            <IconEdit />
          </ActionIcon>
        )
      }
    ],
    [setForm, smallScreen]
  );

  return (
    <DataTable
      columns={columns}
      rowKey={f => f.id}
      items={loadedFlights}
      footer={{
        columns: footerColumns,
        item: data?.ownFlightsTotals
      }}
      pagination={getPg(data?.ownFlights.total)}
      tableProps={{
        className: cn(classes.table, classes.actionColumn),
        horizontalSpacing: "xs"
      }}
    />
  );
};

const footerColumns: DataTableFooterColumn<CumulativeTotals>[] = [
  {
    render: () => (
      <Stack>
        <TableText>Previous</TableText>
        <TableText>Page</TableText>
        <TableText>Cumulated</TableText>
      </Stack>
    )
  },
  {
    colSpan: 3,
    render: ({ singleEngine, multiEngine }) => (
      <Stack align="end" mr="2em">
        <TableText>
          S: {timeFormatter(singleEngine.preceding)} / M:{" "}
          {timeFormatter(multiEngine.preceding)}
        </TableText>
        <TableText>
          S: {timeFormatter(singleEngine.page)} / M:{" "}
          {timeFormatter(multiEngine.page)}
        </TableText>
        <TableText>
          S: {timeFormatter(singleEngine.actual)} / M:{" "}
          {timeFormatter(multiEngine.actual)}
        </TableText>
      </Stack>
    )
  },
  {
    render: ({ totalFlightTime }) => (
      <Stack>
        <TableText>{timeFormatter(totalFlightTime.preceding)}</TableText>
        <TableText>{timeFormatter(totalFlightTime.page)}</TableText>
        <TableText>{timeFormatter(totalFlightTime.actual)}</TableText>
      </Stack>
    )
  },
  null,
  {
    render: ({ landings }) => (
      <Stack>
        <TableText>
          D: {landings.day.preceding} / N: {landings.night.preceding}
        </TableText>
        <TableText>
          D: {landings.day.page} / N: {landings.night.page}
        </TableText>
        <TableText>
          D: {landings.day.actual} / N: {landings.night.actual}
        </TableText>
      </Stack>
    )
  },
  null,
  {
    render: ({ pic }) => (
      <Stack>
        <TableText>{timeFormatter(pic.preceding)}</TableText>
        <TableText>{timeFormatter(pic.page)}</TableText>
        <TableText>{timeFormatter(pic.actual)}</TableText>
      </Stack>
    )
  },
  {
    render: ({ copilot }) => (
      <Stack>
        <TableText>{timeFormatter(copilot.preceding)}</TableText>
        <TableText>{timeFormatter(copilot.page)}</TableText>
        <TableText>{timeFormatter(copilot.actual)}</TableText>
      </Stack>
    )
  },
  {
    render: ({ dualCommand }) => (
      <Stack>
        <TableText>{timeFormatter(dualCommand.preceding)}</TableText>
        <TableText>{timeFormatter(dualCommand.page)}</TableText>
        <TableText>{timeFormatter(dualCommand.actual)}</TableText>
      </Stack>
    )
  },
  {
    render: ({ instructor }) => (
      <Stack>
        <TableText>{timeFormatter(instructor.preceding)}</TableText>
        <TableText>{timeFormatter(instructor.page)}</TableText>
        <TableText>{timeFormatter(instructor.actual)}</TableText>
      </Stack>
    )
  },
  null,
  null
];

const AcClassMap: Record<AircraftClass, string> = {
  [AircraftClass.SingleEngine]: "SE",
  [AircraftClass.MultiEngine]: "ME",
  [AircraftClass.MultiPilot]: "MP"
};

const TableText = Text.withProps({ size: "sm" });
