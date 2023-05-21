import { useState } from "react";
import { Stack } from "@mantine/core";

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
  Form: (props: EntityFormProps) => JSX.Element | null;
  Table: (props: EntityTableProps) => JSX.Element | null;
};

export const makeTableFormManager =
  ({ Form, Table }: TableFormManagerProps) =>
  () => {
    const [form, setForm] = useState<string | null>(null);

    return (
      <Stack>
        {form && (
          <Form
            key={form}
            form={form}
            setForm={setForm}
            isAdd={form === "Add"}
          />
        )}
        <Table setForm={setForm} />
      </Stack>
    );
  };
