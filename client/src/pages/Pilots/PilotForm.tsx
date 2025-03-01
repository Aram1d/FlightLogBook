import { useEffect } from "react";
import { Button, Group, Grid, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  AddPilotInput,
  useAddPilotMutation,
  usePilotQuery,
  useUpdatePilotMutation
} from "@api";
import { EntityFormProps, mutationPromiseHandler, withoutTypeName } from "@lib";

export const PilotForm = ({ form, setForm, isAdd }: EntityFormProps) => {
  const { getInputProps, onSubmit, setValues, reset } = useForm<AddPilotInput>({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: ""
    },
    validate: zodResolver(
      z.object({
        username: z
          .string()
          .min(3, "Username should have at least 3 characters")
          .max(30, "Username should have at most 30 characters"),
        firstName: z
          .string()
          .min(2, "First name should have at least 3 characters")
          .max(30, "First name should have at most 30 characters"),
        lastName: z
          .string()
          .min(2, "Last name should have at least 3 characters")
          .max(30, "Last name should have at most 30 characters"),
        email: z.string().email("Invalid email")
      })
    )
  });

  const [{ data }] = usePilotQuery({ variables: { id: form } });
  useEffect(() => {
    if (data?.pilot) {
      const { id, ...pilot } = data.pilot;
      setValues({
        ...withoutTypeName(pilot),
        email: data.pilot.email.address
      });
    }
  }, [data?.pilot]); //eslint-disable-line react-hooks/exhaustive-deps

  const [, addPilot] = useAddPilotMutation();
  const [, updatePilot] = useUpdatePilotMutation();

  return (
    <form
      onSubmit={onSubmit(values => {
        isAdd
          ? addPilot({ pilot: values }).then(
              mutationPromiseHandler("Pilot successfully added", reset)
            )
          : updatePilot({ id: form, pilot: values }).then(
              mutationPromiseHandler("Pilot successfully updated", () =>
                setForm?.(null)
              )
            );
      })}
    >
      <Title order={4}>{isAdd ? "Add new pilot" : "Edit pilot"}</Title>
      <Grid columns={2}>
        <Grid.Col span={1}>
          <TextInput label="Last name" {...getInputProps("lastName")} />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput label="First name" {...getInputProps("firstName")} />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput label="Username" {...getInputProps("username")} />
        </Grid.Col>
        <Grid.Col span={1}>
          <TextInput label="Email" {...getInputProps("email")} />
        </Grid.Col>

        <Grid.Col span={2}>
          <Group justify="flex-end">
            <Button variant="subtle" onClick={reset}>
              Reset
            </Button>
            <Button variant="subtle" onClick={() => setForm?.(null)}>
              Close
            </Button>
            <Button type="submit">{isAdd ? "Add" : "Edit"}</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};
