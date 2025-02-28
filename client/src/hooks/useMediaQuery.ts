import { MantineSize, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type UseBreakpointArg = { wider: MantineSize } | { narrower: MantineSize };

export const useBreakpoint = (condition: UseBreakpointArg) => {
  const theme = useMantineTheme();

  return useMediaQuery(
    "wider" in condition
      ? `(min-width: ${theme.breakpoints[condition.wider]})`
      : `(max-width: ${theme.breakpoints[condition.narrower]})`
  );
};
