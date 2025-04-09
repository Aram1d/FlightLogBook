import { useRef } from "react";
import {
  Button,
  Group,
  Popover,
  PopoverProps,
  Stack,
  Text
} from "@mantine/core";
import { useStore } from "@hooks";
import { stopPropagation } from "@lib";

interface DeletePopoverProps extends Omit<PopoverProps, "children"> {
  confirmationMsg?: React.ReactNode;
  children: (open: () => void) => React.ReactNode;
  deleteFn: (close: () => void) => void | Promise<void>;
}
export const DeletePopover = ({
  confirmationMsg,
  children,
  deleteFn,
  ...props
}: DeletePopoverProps) => {
  const mutexRef = useRef(null);
  const deletePopoverMutex = useStore(s => s.deletePopoverMutex);
  const setDeletePopoverMutex = useStore(s => s.setDeletePopoverMutex);

  return (
    <Popover
      position="bottom-end"
      withArrow
      opened={deletePopoverMutex === mutexRef}
      onChange={() => setDeletePopoverMutex(mutexRef)}
      {...props}
    >
      <Popover.Target>
        {children(() => setDeletePopoverMutex(mutexRef))}
      </Popover.Target>
      <Popover.Dropdown onClick={stopPropagation()}>
        <Stack>
          <Text>{confirmationMsg ?? "Confirm deletion?"}</Text>
          <Group>
            <Button
              color="red"
              onClick={stopPropagation(() => {
                deleteFn(() => setDeletePopoverMutex(mutexRef));
              })}
            >
              Yes
            </Button>
            <Button
              variant="light"
              onClick={stopPropagation(() => setDeletePopoverMutex(mutexRef))}
            >
              No
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};
