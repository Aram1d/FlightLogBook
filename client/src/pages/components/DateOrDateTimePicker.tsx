import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  DateInput,
  DatePickerInputProps,
  DateTimePicker
} from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

type DateOrDateTimePickerProps = Pick<
  DatePickerInputProps,
  "label" | "value" | "onChange" | "onFocus" | "onBlur" | "minDate" | "maxDate"
>;
export const DateOrDateTimePicker = (props: DateOrDateTimePickerProps) => {
  const [dateOnly, { open, close }] = useDisclosure(false);

  return dateOnly ? (
    <DateInput
      label={props.label}
      rightSection={
        <ActionIcon>
          <IconCalendar onClick={close} />
        </ActionIcon>
      }
      value={props.value}
      onChange={props.onChange}
    />
  ) : (
    <DateTimePicker
      label="Date / Time"
      rightSection={
        <ActionIcon>
          <IconCalendar onClick={open} />
        </ActionIcon>
      }
      {...props}
    />
  );
};
