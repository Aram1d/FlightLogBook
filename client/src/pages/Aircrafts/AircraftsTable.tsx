import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Stack,
  Title
} from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { IconEdit } from "@tabler/icons-react";
import { Aircraft, useAircraftsQuery } from "../../api/gqlTypes";
import { EntityTableProps } from "../../layout/managerFactory";
import { usePagniation } from "../../utils/usePagniation";

export const AircraftsTable = ({ setForm }: EntityTableProps) => {
  const pagination = usePagniation();
  const [{ data }] = useAircraftsQuery({
    variables: {
      pager: {
        pagination: {
          page: pagination.page,
          limit: pagination.recordsPerPage
        }
      }
    }
  });

  const columns: DataTableColumn<Aircraft>[] = [
    {
      accessor: "registration",
      title: "Registration"
    },
    { accessor: "brand", title: "Brand" },
    { accessor: "model", title: "Model" },
    {
      accessor: "capabilities",
      title: "Capabilities",
      render: acft =>
        acft.capabilities.length ? (
          acft.capabilities.map((cp, index) => <Badge key={index}>{cp}</Badge>)
        ) : (
          <Badge> - </Badge>
        )
    },
    {
      accessor: "id",
      title: "Actions",
      render: acft => (
        <ActionIcon onClick={() => setForm(acft.id)}>
          <IconEdit />
        </ActionIcon>
      )
    }
  ];

  return (
    <Card>
      <Stack>
        <Group position="apart">
          <Title order={4}>Aircrafts</Title>
          <Button variant="light" onClick={() => setForm("Add")}>
            Add
          </Button>
        </Group>
        <DataTable
          columns={columns}
          records={data?.aircrafts.items}
          totalRecords={data?.aircrafts.total}
          {...pagination}
        />
      </Stack>
    </Card>
  );
};
