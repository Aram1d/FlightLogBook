import { Radio, RadioGroupProps, Stack } from "@mantine/core";
import { AircraftClass } from "../../../api/gqlTypes";

type AircraftClassSCProps = Omit<
  RadioGroupProps,
  "label" | "value" | "onChange" | "children"
> & {
  value: AircraftClass;
  onChange: (value: AircraftClass) => void;
};

export const AircraftClassSC = (props: AircraftClassSCProps) => {
  return (
    <Radio.Group label="Aircraft class" {...props}>
      <Stack mt="xs">
        <Radio
          value={AircraftClass.SingleEngine}
          label="Single-engine - (single-pilot)"
        />
        <Radio
          value={AircraftClass.MultiEngine}
          label="Multi-engine --- (single-pilot)"
        />
        <Radio value={AircraftClass.MultiPilot} label="Multi-pilot" />
      </Stack>
    </Radio.Group>
  );
};
