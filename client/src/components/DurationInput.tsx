import {
  ActionIcon,
  Group,
  NumberInput,
  NumberInputProps
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";

type DurationInputProps = NumberInputProps & {
  onSync?: () => void;
};
export const DurationInput = (props: DurationInputProps) => {
  const { onSync, ...restProps } = props;
  return (
    <Group align="flex-end" gap="xs" pos="relative">
      <NumberInput
        {...restProps}
        // parser={time => {
        //   const isNegative = time.startsWith("-");
        //   const [hours, minutes] = time.replace("-", "").split(":");
        //   return (
        //     (isNegative ? "-" : "") +
        //     (parseInt(hours) * 60 + parseInt(minutes)).toString()
        //   );
        // }}
        // formatter={timeFormatter}
        width="100%"
      />
      {props.onSync && (
        <ActionIcon
          pos="absolute"
          right={`calc(1.5rem + 0.0625rem + 0.3125rem)`}
          mb="0.25rem"
          variant="transparent"
        >
          <IconRefresh onClick={props.onSync} />
        </ActionIcon>
      )}
    </Group>
  );
};

export const timeFormatter = (n: string | number | null | undefined) => {
  if (!n) return "-- : --";
  const minutes = typeof n === "number" ? n : parseFloat(n);
  const hours = Math.abs(~~(minutes / 60));

  return `${minutes < 0 ? "-" : ""}${hours
    .toString()
    .padStart(2, "0")}:${Math.abs(minutes % 60)
    .toString()
    .padStart(2, "0")}`;
};
