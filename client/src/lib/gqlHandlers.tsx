import React from "react";
import { showNotification } from "@mantine/notifications";
import { CombinedError, OperationResult } from "urql";
import { cloneDeep } from "lodash-es";
import { DeepOmit } from "@lib";

export const successNotification = (msg: React.ReactNode) =>
  showNotification({
    title: "Succès:",
    color: "green",
    message: msg
  });
export const urqlErrorNotification = (err: CombinedError) => {
  showNotification({
    title: err.networkError ? "Erreur réseau" : "Erreur",
    color: "red",
    message: err?.networkError
      ? err.networkError.message
      : err.graphQLErrors[0].message
  });
};

export const omitTypename = <T extends Record<string, any>>(arg: T) => {
  const draft = cloneDeep(arg);
  if (draft.hasOwnProperty("__typename")) {
    delete draft.__typename;
  }
  for (const key in draft) {
    if (typeof draft[key] === "object") {
      draft[key] = omitTypename(draft[key]);
    }
  }
  return draft as DeepOmit<T, "__typename">;
};

export const mutationPromiseHandler =
  <T1, T2 extends Record<string, any>>(
    successMsg: string,
    successCb?: (arg: T1) => void
  ) =>
  ({ data, error }: OperationResult<T1, T2>) => {
    if (error) {
      urqlErrorNotification(error);
    } else if (data) {
      successNotification(successMsg);
      successCb?.(data);
    }
  };

export const withoutTypeName = (obj: Record<string, any>) => {
  const { __typename, ...rest } = obj;
  return rest;
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
