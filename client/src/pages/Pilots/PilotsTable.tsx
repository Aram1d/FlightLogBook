import { ActionIcon } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import classes from "@components/DataTable/TableRow.module.css";
import { Pilot, useDeletePilotMutation, usePilotsQuery } from "@api";
import { DataTable, DataTableColumn, DeletePopover, Right } from "@components";
import { usePagination } from "@hooks";
import { EntityTableProps, cn, handleMutation } from "@lib";

export const PilotsTable = ({ setForm }: EntityTableProps) => {
  const [pagination, getPg] = usePagination({ pageSizes: [5, 10, 20] });
  const [{ data }] = usePilotsQuery({
    variables: {
      pager: {
        pagination
      }
    }
  });

  const [, deletePilot] = useDeletePilotMutation();

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
      render: p => (
        <Right wrap="nowrap">
          {p.deletable && (
            <DeletePopover
              deleteFn={() =>
                handleMutation(deletePilot({ id: p.id }), {
                  successMsg: `${p.firstName} ${p.lastName} removed.`
                })
              }
            >
              {open => (
                <ActionIcon variant="subtle" color="red" onClick={open}>
                  <IconTrash />
                </ActionIcon>
              )}
            </DeletePopover>
          )}
          <ActionIcon variant="subtle" onClick={() => setForm(p.id)}>
            <IconEdit />
          </ActionIcon>
        </Right>
      )
    }
  ];

  return (
    <DataTable
      columns={columns}
      rowKey={p => p.id}
      items={data?.pilots.items ?? []}
      pagination={getPg(data?.pilots.total)}
      tableProps={{ className: cn(classes.table, classes.actionColumn) }}
    />
  );
};
