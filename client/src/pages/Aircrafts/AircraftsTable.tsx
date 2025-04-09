import { ActionIcon, Badge } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import classes from "@components/DataTable/TableRow.module.css";
import { Aircraft, useAircraftsQuery, useDeleteAircraftMutation } from "@api";
import { DataTable, DataTableColumn, DeletePopover, Right } from "@components";
import { usePagination } from "@hooks";
import { cn, EntityTableProps, handleMutation } from "@lib";

export const AircraftsTable = ({ setForm }: EntityTableProps) => {
  const [pagination, getPg] = usePagination({ pageSizes: [5, 10, 20] });
  const [{ data }] = useAircraftsQuery({
    variables: {
      pager: {
        pagination
      }
    }
  });

  const [, deleteAircraft] = useDeleteAircraftMutation();

  const columns: DataTableColumn<Aircraft>[] = [
    {
      title: "Registration",
      render: a => a.registration
    },
    { title: "Brand", render: a => a.brand },
    { title: "Model", render: a => a.model },
    {
      title: "Capabilities",
      render: acft =>
        acft.capabilities.length ? (
          acft.capabilities.map((cp, index) => <Badge key={index}>{cp}</Badge>)
        ) : (
          <Badge> - </Badge>
        )
    },
    {
      title: "",
      render: a => (
        <Right wrap="nowrap">
          {a.deletable && (
            <DeletePopover
              deleteFn={() =>
                handleMutation(deleteAircraft({ id: a.id }), {
                  successMsg: `${a.registration} removed.`
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
          <ActionIcon variant="subtle" onClick={() => setForm(a.id)}>
            <IconEdit />
          </ActionIcon>
        </Right>
      )
    }
  ];

  return (
    <DataTable
      tableProps={{ className: cn(classes.table, classes.actionColumn) }}
      rowKey={a => a.id}
      columns={columns}
      items={data?.aircrafts.items ?? []}
      pagination={getPg(data?.aircrafts.total)}
    />
  );
};
