import { DataTable, DataTableColumn } from "mantine-datatable";
import { OwnFlightsQuery, useOwnFlightsQuery } from "../../api/gqlTypes";
import { ActionIcon, Button, Card, Group, Stack, Title } from "@mantine/core";
import { EntityTableProps } from "../../layout/managerFactory";
import { ArrayElement } from "../../utils/gqlHandlers";
import dayjs from "dayjs";
import { timeFormatter } from "../components/DurationInput";
import { IconEdit } from "@tabler/icons-react";
import { usePagniation } from "../../utils/usePagniation";

type OwnFlight = ArrayElement<OwnFlightsQuery["ownFlights"]["items"]>;

export const FlightTable = ({ setForm }: EntityTableProps) => {
  const pagination = usePagniation();
  const [{ data }] = useOwnFlightsQuery({
    variables: {
      pager: {
        pagination: { page: pagination.page, limit: pagination.recordsPerPage },
      },
    },
  });

  const columns: DataTableColumn<OwnFlight>[] = [
    {
      accessor: "departure",
      title: "Departure",
      render: (f) =>
        `${f.departure.place} ${dayjs(f.departure.date).format(
          "DD.MM.YYYY HH:mm"
        )}`,
    },
    {
      accessor: "arrival",
      title: "Arrival",
      render: (f) =>
        `${f.arrival.place} ${dayjs(f.arrival.date).format(
          "DD:MM:YYYY HH:mm"
        )}`,
    },
    {
      accessor: "aircraft",
      title: "Aircraft",
      render: (f) => f.aircraft?.registration,
    },
    { accessor: "aircraftClass", title: "Class" },
    {
      accessor: "totalFlightTime",
      title: "Total time",
      render: (f) => timeFormatter(f.totalFlightTime),
    },
    { accessor: "pic", title: "PIC", render: (f) => `${f.pic.lastName}` },
    {
      accessor: "landings",
      title: "Landings",
      render: (f) => `${f.landings.day} D - ${f.landings.night} N `,
    },
    {
      accessor: "operationalTime",
      title: "Operational time",
      render: (f) =>
        `${f.operationalTime.ifr} IFR - ${f.operationalTime.night} Night`,
    },
    {
      accessor: "picTime",
      title: "Pic",
      render: (f) => timeFormatter(f.pilotFunctionTime.pic),
    },
    {
      accessor: "copilotTime",
      title: "Cop",
      render: (f) => timeFormatter(f.pilotFunctionTime.coPilot),
    },
    {
      accessor: "dualCommand",
      title: "D.C.",
      render: (f) => timeFormatter(f.pilotFunctionTime.dualCommand),
    },
    {
      accessor: "Fi",
      title: "F.I.",
      render: (f) => timeFormatter(f.pilotFunctionTime.instructor),
    },
    {
      accessor: "remarks",
      title: "Remarks",
      render: (f) => `${f.remarks}`,
    },
    {
      accessor: "id",
      title: "Actions",
      render: (flt) => (
        <ActionIcon onClick={() => setForm(flt.id)}>
          <IconEdit />
        </ActionIcon>
      ),
    },
  ];

  return (
    <Card>
      <Stack>
        <Group position="apart">
          <Title order={4}>Flights</Title>
          <Button variant="light" onClick={() => setForm("Add")}>
            Add
          </Button>
        </Group>
        <DataTable
          columns={columns}
          records={data?.ownFlights.items}
          totalRecords={data?.ownFlights.total}
          {...pagination}
        />
      </Stack>
    </Card>
  );
};
