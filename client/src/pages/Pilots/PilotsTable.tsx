import { ActionIcon, Button, Card, Group, Stack, Title } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IconEdit } from "@tabler/icons-react";
import { Pilot, usePilotsQuery } from "@api";
import { usePagination } from "@hooks";
import { EntityTableProps } from "@lib";

export const PilotsTable = ({ setForm }: EntityTableProps) => {
  const pagination = usePagination();
  const [{ data }] = usePilotsQuery({
    variables: {
      pager: {
        pagination: { page: pagination.page, limit: pagination.recordsPerPage },
      },
    },
  });

  const columns: DataTableColumn<Omit<Pilot, "credentials" | "passwords">>[] = [
    {
      accessor: "lastName",
      title: "Last name",
    },
    {
      accessor: "firstName",
      title: "First name",
    },
    { accessor: "username" },
    {
      accessor: "actions",
      title: "Actions",
      render: (pilot) => (
        <ActionIcon>
          <IconEdit onClick={() => setForm(pilot.id)} />
        </ActionIcon>
      ),
    },
  ];

  return (
    <Card>
      <Stack>
        <Group position="apart">
          <Title order={4}>Pilots</Title>
          <Button variant="light" onClick={() => setForm("Add")}>
            Add
          </Button>
        </Group>
        <DataTable
          recordsPerPageOptions={[5, 10, 20]}
          columns={columns}
          records={data?.pilots.items}
          totalRecords={data?.pilots.total}
          {...pagination}
        />
      </Stack>
    </Card>
  );
};
