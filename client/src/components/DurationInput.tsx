import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { ActionIcon, Group, InputBase, InputBaseProps } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { noop } from "lodash-es";
import { timeFormatter } from "@lib";

const TIME_PLACEHOLDER = "-- : --";

type DurationInputProps = InputBaseProps & {
  value?: number;
  onChange?: (value: number) => void;
  onSync?: () => void;
};
export const DurationInput = (props: DurationInputProps) => {
  const { onSync, onChange = noop, value = 0, ...restProps } = props;

  const [stringState, setStringState] = useState<string>("-- : --");

  useEffect(() => {
    setStringState(timeFormatter(value));
  }, [value]);

  const handleTimeChange = (value: string) => {
    !value && onChange(0);

    const [minutes, hours] = value.split(":").reverse().map(Number);
    if (!isNaN(minutes)) {
      onChange(minutes + (hours * 60 || 0));
    }
  };

  return (
    <Group align="flex-end" gap="xs" pos="relative" w="100%">
      <InputBase
        {...restProps}
        placeholder={TIME_PLACEHOLDER}
        component={IMaskInput}
        mask={["0000:00", "000:00", "00:00", "0:00"]}
        value={stringState}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setStringState(event.currentTarget.value)
        }
        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleTimeChange(event.currentTarget.value)
        }
        styles={{
          root: {
            width: "100%"
          }
        }}
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
