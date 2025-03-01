import { ReactNode, useState } from "react";
import { Button, Title } from "@mantine/core";

import { FhStack, SpaceBetween, TableWrapperStack } from "@components";

export type EntityTableProps = {
  setForm: (arg: string) => void;
};

export type EntityFormProps = {
  form: string;
  isAdd: boolean;
  setForm?: (arg: null) => void;
  returnId?: (id: string) => void;
};

type TableFormManagerProps = {
  Form: (props: EntityFormProps) => ReactNode;
  Table: (props: EntityTableProps) => ReactNode;
  tableWrapper: {
    title: ReactNode;
  };
};

export const makeTableFormManager =
  ({ Form, Table, tableWrapper }: TableFormManagerProps) =>
  () => {
    const [form, setForm] = useState<string | null>(null);

    return (
      <FhStack>
        {form && (
          <Form
            key={form}
            form={form}
            setForm={setForm}
            isAdd={form === "Add"}
          />
        )}
        <TableWrapperStack>
          {!form && (
            <SpaceBetween>
              <Title order={4}>{tableWrapper.title}</Title>
              <Button variant="light" onClick={() => setForm("Add")}>
                Add
              </Button>
            </SpaceBetween>
          )}
          <Table setForm={setForm} />
        </TableWrapperStack>
      </FhStack>
    );
  };
