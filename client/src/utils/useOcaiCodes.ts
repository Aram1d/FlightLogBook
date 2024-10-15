import { useCallback } from "react";
import { useListState } from "@mantine/hooks";
import { uniq } from "lodash-es";
import { useOcaiCodesQuery } from "../api/gqlTypes";

export const useOcaiCodes = () => {
  const [values, { prepend }] = useListState<string>([]);

  const addOcai = useCallback(
    (ocai: string) => {
      prepend(ocai.toUpperCase());
      return ocai;
    },
    [prepend],
  );

  const [{ data }] = useOcaiCodesQuery();

  return [uniq([...values, ...(data?.ocaiCodes ?? [])]), addOcai] as const;
};
