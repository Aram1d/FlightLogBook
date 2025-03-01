import { useEffect } from "react";
import { Button, Checkbox, Grid, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import {
  AddAircraftInput,
  AircraftCapabilities,
  useAddAircraftMutation,
  useAircraftQuery,
  useUpdateAircraftMutation
} from "@api";
import { EntityFormProps, mutationPromiseHandler, withoutTypeName } from "@lib";

export const AircraftForm = ({ setForm, form, isAdd }: EntityFormProps) => {
  const { getInputProps, onSubmit, setValues, reset } =
    useForm<AddAircraftInput>({
      initialValues: {
        brand: "",
        model: "",
        registration: "",
        capabilities: []
      },
      validate: zodResolver(
        z.object({
          brand: z
            .string()
            .min(3, "brand should have at least 3 characters")
            .max(30, "username should have at most 30 characters"),
          model: z
            .string()
            .min(3, "brand should have at least 3 characters")
            .max(30, "username should have at most 30 characters"),
          registration: z
            .string()
            .min(3, "brand should have at least 3 characters")
            .max(10, "username should have at most 30 characters")
        })
      )
    });

  const [{ data }] = useAircraftQuery({ variables: { id: form } });

  useEffect(() => {
    if (data?.aircraft) {
      const { id, ...acft } = data.aircraft;
      setValues(withoutTypeName(acft));
    }
  }, [data?.aircraft]); // eslint-disable-line react-hooks/exhaustive-deps

  const [, addAircraft] = useAddAircraftMutation();
  const [, updateAircraft] = useUpdateAircraftMutation();

  return (
    <form
      onSubmit={onSubmit(values => {
        isAdd
          ? addAircraft({ aircraft: values }).then(
              mutationPromiseHandler("Aircraft successfully added", reset)
            )
          : updateAircraft({
              id: form,
              aircraft: values
            }).then(
              mutationPromiseHandler("Aircraft successfully updated", () =>
                setForm?.(null)
              )
            );
      })}
    >
      <Grid columns={24}>
        <Grid.Col span={12}>
          <TextInput label="Brand" {...getInputProps("brand")} required />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput label="Model" {...getInputProps("model")} required />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput
            label="Registration"
            {...getInputProps("registration")}
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Checkbox.Group
            label="Aircrafts characteristics"
            {...getInputProps("capabilities")}
          >
            <Group mt="xs">
              <Checkbox
                value={AircraftCapabilities.IsIfr}
                label="IFR flights"
              />
              <Checkbox
                value={AircraftCapabilities.IsMultiEngine}
                label="Multi-engines"
              />
            </Group>
          </Checkbox.Group>
        </Grid.Col>
        <Grid.Col span={24}>
          <Group justify="flex-end">
            <Button variant="subtle" onClick={reset}>
              Reset
            </Button>
            <Button variant="subtle" onClick={() => setForm?.(null)}>
              Close
            </Button>

            <Button type="submit">{isAdd ? "Add" : "Update"}</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};
