import { useEffect } from "react";
import { Button, Group, Card, Grid, TextInput } from "@mantine/core";
import {
  AddPilotInput,
  useAddPilotMutation,
  usePilotQuery,
  useUpdatePilotMutation,
} from "../../api/gqlTypes";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { EntityFormProps } from "../../layout/managerFactory";
import {
  mutationPromiseHandler,
  withoutTypeName,
} from "../../utils/gqlHandlers";

export const PilotForm = ({ form, setForm, isAdd }: EntityFormProps) => {
  const { getInputProps, onSubmit, setValues, reset, validate } =
    useForm<AddPilotInput>({
      initialValues: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
      },
      validate: zodResolver(
        z.object({
          username: z
            .string()
            .min(3, "username should have at least 3 characters")
            .max(30, "username should have at most 30 characters"),
          firstName: z
            .string()
            .min(2, "firstname should have at least 3 characters")
            .max(30, "firstname should have at most 30 characters"),
          lastName: z
            .string()
            .min(2, "lastname should have at least 3 characters")
            .max(30, "lastname should have at most 30 characters"),
          email: z.string().email("Invalid email"),
        })
      ),
    });

  const [{ data }] = usePilotQuery({ variables: { id: form } });
  useEffect(() => {
    if (data?.pilot) {
      const { id, ...pilot } = data.pilot;
      setValues({
        ...withoutTypeName(pilot),
        email: data.pilot.email.address,
      });
    }
  }, [data?.pilot]);

  const [, addPilot] = useAddPilotMutation();
  const [, updatePilot] = useUpdatePilotMutation();

  return (
    <Card sx={{ overflow: "visible" }}>
      <form
        onSubmit={onSubmit((values) => {
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
            <Group position="right">
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
    </Card>
  );
};
