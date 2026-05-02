import { ActionIcon } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
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
  // Use a modal on touch devices (tablets / phones) to avoid focus issues in
  // the popover on iOS Safari. Desktops with a mouse keep the popover.
  const isTouchDevice = useMediaQuery("(pointer: coarse)");
  const dropdownType = isTouchDevice ? "modal" : "popover";

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
      dropdownType={dropdownType}
      rightSection={
        <ActionIcon>
          <IconCalendar onClick={open} />
        </ActionIcon>
      }
    />
  );
};
