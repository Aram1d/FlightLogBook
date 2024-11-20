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
      value={props.value}
      onChange={props.onChange}
      rightSection={
        <ActionIcon>
          <IconCalendar onClick={close} />
        </ActionIcon>
      }
    />
  ) : (
    <DateTimePicker
      label="Date / Time"
      value={props.value}
      onChange={props.onChange}
      rightSection={
        <ActionIcon>
          <IconCalendar onClick={open} />
        </ActionIcon>
      }
    />
  );
};
