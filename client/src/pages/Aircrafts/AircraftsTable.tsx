import { ActionIcon, Badge } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import classes from "@components/DataTable/TableRow.module.css";
import { Aircraft, useAircraftsQuery } from "@api";
import { DataTable, DataTableColumn } from "@components";
import { usePagination } from "@hooks";
import { cn, EntityTableProps } from "@lib";

export const AircraftsTable = ({ setForm }: EntityTableProps) => {
  const [pagination, getPg] = usePagination({ pageSizes: [5, 10, 20] });
  const [{ data }] = useAircraftsQuery({
    variables: {
      pager: {
        pagination
      }
    }
  });

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
      render: acft => (
        <ActionIcon variant="subtle" onClick={() => setForm(acft.id)}>
          <IconEdit />
        </ActionIcon>
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
