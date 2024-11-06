import { Radio, RadioGroupProps, Stack } from "@mantine/core";
import { AircraftClass } from "@api";
import { sanitizeStringToEnum } from "@lib";

type AircraftClassSCProps = Omit<
  RadioGroupProps,
  "label" | "value" | "onChange" | "children"
> & {
  value: AircraftClass;
  onChange: (value: AircraftClass) => void;
};

export const AircraftClassSC = ({
  onChange,
  ...props
}: AircraftClassSCProps) => {
  return (
    <Radio.Group
      name="aircraft-class"
      label="Aircraft class"
      onChange={v =>
        onChange(
          sanitizeStringToEnum(AircraftClass, v, AircraftClass.SingleEngine)
        )
      }
      {...props}
    >
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
