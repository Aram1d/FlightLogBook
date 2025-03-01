import { ActionIcon, Button, Title } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import classes from "@components/DataTable/TableRow.module.css";
import { Pilot, usePilotsQuery } from "@api";
import {
  DataTable,
  DataTableColumn,
  SpaceBetween,
  TableWrapperStack
} from "@components";
import { usePagination } from "@hooks";
import { EntityTableProps, cn } from "@lib";

export const PilotsTable = ({ setForm }: EntityTableProps) => {
  const [pagination, getPg] = usePagination({ pageSizes: [5, 10, 20] });
  const [{ data }] = usePilotsQuery({
    variables: {
      pager: {
        pagination
      }
    }
  });

  const columns: DataTableColumn<Omit<Pilot, "credentials" | "passwords">>[] = [
    {
      title: "Last name",
      render: p => p.lastName
    },
    {
      title: "First name",
      render: p => p.firstName
    },
    { title: "Username", render: p => p.username },
    {
      title: "",
      render: pilot => (
        <ActionIcon variant="subtle" onClick={() => setForm(pilot.id)}>
          <IconEdit />
        </ActionIcon>
      )
    }
  ];

  return (
    <TableWrapperStack>
      <SpaceBetween>
        <Title order={4}>Pilots</Title>
        <Button variant="light" onClick={() => setForm("Add")}>
          Add
        </Button>
      </SpaceBetween>
      <DataTable
        columns={columns}
        rowKey={p => p.id}
        items={data?.pilots.items ?? []}
        pagination={getPg(data?.pilots.total)}
        tableProps={{ className: cn(classes.table, classes.actionColumn) }}
      />
    </TableWrapperStack>
  );
};
