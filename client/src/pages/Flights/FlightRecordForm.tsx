import React, { useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Grid,
  Group,
  NumberInput,
  SegmentedControl,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  Title
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  useAddFlightMutation,
  useUpdateFlightMutation,
  useFlightQuery,
  usePilotsListQuery
} from "@api";
import {
  AircraftClassSC,
  DateOrDateTimePicker,
  DurationInput,
  SelectCreatable
} from "@components";
import { useFlightRecordState, useOcaiCodes } from "@hooks";

import { mutationPromiseHandler, omitTypename, EntityFormProps } from "@lib";

type FlightRecordFormProps = { children: React.ReactNode };
const FlightRecordTitle = ({ children, ...rest }: FlightRecordFormProps) => (
  <Title order={4} {...rest}>
    {children}
  </Title>
);

export const FlightRecordForm = ({ form, setForm, isAdd }: EntityFormProps) => {
  const [ocaiCodes, addOcai] = useOcaiCodes();

  const [{ data: pilotsList }] = usePilotsListQuery();

  const {
    setFieldValue,
    setValues,
    reset,
    adapter,
    setAdapter,
    values,
    getInputProps,
    onSubmit,
    customHandlers,
    acftList
  } = useFlightRecordState();

  const {
    acftModels,
    acftRegs,
    selectedModel,
    setSelectedModel,
    setAircraftId
  } = acftList;

  const [{ data }] = useFlightQuery({ variables: { id: form }, pause: isAdd });

  useEffect(() => {
    if (data?.flight) {
      const { __typename, id, aircraft, pic, pilot, ...flight } = data.flight;

      setValues({
        aircraft: aircraft?.id,
        pic: pic?.id,
        ...omitTypename(flight)
      });
    }
  }, [data?.flight]); //eslint-disable-line

  const [, addFlight] = useAddFlightMutation();
  const [, updateFlight] = useUpdateFlightMutation();

  return (
    <Card style={{ overflow: "visible" }}>
      <Title order={3}>{isAdd ? "Add new flight" : "Edit flight"}</Title>
      <form
        onSubmit={onSubmit(values => {
          isAdd
            ? addFlight({ flight: values }).then(
                mutationPromiseHandler("Flight added", reset)
              )
            : updateFlight({ id: form, flight: values }).then(
                mutationPromiseHandler("Flight updated", () => setForm?.(null))
              );
        })}
      >
        <Grid columns={22}>
          <Grid.Col span={4}>
            <Stack>
              <FlightRecordTitle>Departure</FlightRecordTitle>
              <SelectCreatable
                label="Place"
                placeholder="OCAI code"
                data={ocaiCodes}
                onCreate={addOcai}
                {...getInputProps("departure.place")}
              />
              <DateOrDateTimePicker
                label="Date / Time"
                {...getInputProps("departure.date")}
                onChange={customHandlers.setDepartureTime}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={4}>
            <Stack>
              <FlightRecordTitle>Arrival</FlightRecordTitle>
              <SelectCreatable
                label="Place"
                placeholder="OCAI code"
                data={ocaiCodes}
                onCreate={addOcai}
                value=""
                {...getInputProps("arrival.place")}
              />
              <DateOrDateTimePicker
                label="Date / Time"
                minDate={values.departure.date ?? undefined}
                {...getInputProps("arrival.date")}
                onChange={customHandlers.setArrivalTime}
                onFocus={() => {
                  if (
                    !getInputProps("arrival.date") &&
                    getInputProps("departure.date")
                  ) {
                    getInputProps("arrival.date").onChange(
                      getInputProps("departure.date").value
                    );
                  }
                }}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}>
            <Stack>
              <FlightRecordTitle>Aircraft</FlightRecordTitle>
              <Select
                label="Model"
                allowDeselect
                data={acftModels}
                value={selectedModel}
                onChange={v => {
                  setSelectedModel(v);
                  getInputProps("aircraft").onChange(null);
                }}
              />
              <Select
                label="Registration"
                data={acftRegs}
                {...getInputProps("aircraft")}
                onChange={v => {
                  setAircraftId(v);
                  getInputProps("aircraft").onChange(v);
                }}
              />
            </Stack>
          </Grid.Col>

          <Grid.Col span={5}>
            <Stack>
              <FlightRecordTitle>Class</FlightRecordTitle>
              <AircraftClassSC value="" {...getInputProps("aircraftClass")} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={4}>
            <Stack>
              <FlightRecordTitle>Flight Time / PIC Info</FlightRecordTitle>
              <DurationInput
                label="Total flight time"
                {...getInputProps("totalFlightTime")}
                onChange={customHandlers.setTotalFlightTime}
              />
              <Select
                label="PIC name"
                data={
                  pilotsList?.pilots.items.map(
                    ({ id, firstName, lastName }) => ({
                      label: `${firstName}  ${lastName}`,
                      value: id
                    })
                  ) ?? []
                }
                {...getInputProps("pic")}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Stack>
              <FlightRecordTitle>Landings</FlightRecordTitle>
              <NumberInput label="Day" {...getInputProps("landings.day")} />
              <NumberInput label="Night" {...getInputProps("landings.night")} />
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <Stack>
              <FlightRecordTitle>Operational Time</FlightRecordTitle>
              <DurationInput
                label="Night"
                {...getInputProps("operationalTime.night")}
              />
              <DurationInput
                label="IFR"
                {...getInputProps("operationalTime.ifr")}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <FlightRecordTitle>Pilot Fn time</FlightRecordTitle>
              <SimpleGrid cols={2}>
                <DurationInput
                  label="PIC"
                  {...getInputProps("pilotFunctionTime.pic")}
                  onSync={() =>
                    setFieldValue(
                      "pilotFunctionTime.pic",
                      values.totalFlightTime
                    )
                  }
                />
                <DurationInput
                  label="Copilot"
                  {...getInputProps("pilotFunctionTime.coPilot")}
                  onSync={() =>
                    setFieldValue(
                      "pilotFunctionTime.coPilot",
                      values.totalFlightTime
                    )
                  }
                />
                <DurationInput
                  label="DC"
                  {...getInputProps("pilotFunctionTime.dualCommand")}
                  onSync={() =>
                    setFieldValue(
                      "pilotFunctionTime.dualCommand",
                      values.totalFlightTime
                    )
                  }
                />
                <DurationInput
                  label="Instructor"
                  {...getInputProps("pilotFunctionTime.instructor")}
                  onSync={() =>
                    setFieldValue(
                      "pilotFunctionTime.instructor",
                      values.totalFlightTime
                    )
                  }
                />
              </SimpleGrid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <FlightRecordTitle>Simulator</FlightRecordTitle>
              <Select
                label="Type"
                data={acftModels}
                {...getInputProps("simulatorType")}
                onChange={customHandlers.setSimulationAcftType}
              />
              <SimpleGrid cols={2}>
                <DurationInput
                  label="Time"
                  value={values.simulatorType ? values.totalFlightTime : 0}
                  disabled={!values.simulatorType}
                />
                <DatePickerInput
                  label="Date"
                  value={getInputProps("departure.time").value}
                  readOnly
                  disabled={!values.simulatorType}
                />
              </SimpleGrid>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6} h="100%">
            <Stack>
              <FlightRecordTitle>R & E</FlightRecordTitle>
              <Textarea label="Remarks" {...getInputProps("remarks")} />
              <SegmentedControl
                data={[
                  { label: "Departure", value: "d" },
                  { label: "Arrival", value: "a" }
                ]}
                onChange={v => setAdapter(v as "d" | "a")}
                value={adapter}
              />
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider my="md" variant="dotted" />
        <Group justify="right">
          <Button variant="subtle">Reset</Button>
          <Button
            variant="subtle"
            onClick={() => {
              setForm?.(null);
            }}
          >
            Close
          </Button>
          <Button type="submit">Validate</Button>
        </Group>
      </form>
    </Card>
  );
};
