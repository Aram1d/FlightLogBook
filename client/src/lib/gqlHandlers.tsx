import React from "react";
import { notifications, showNotification } from "@mantine/notifications";
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

type HandleMutationResultParams<TData> = {
  successMsg?: string;
  onSuccess?: (data: TData) => void;
  onError?: (error: CombinedError) => void;
};

export async function handleMutation<
  TVariables extends Record<string, any>,
  TData
>(
  mutationPromise: Promise<OperationResult<TData, TVariables>>,
  { successMsg, onSuccess, onError }: HandleMutationResultParams<TData>
) {
  await mutationPromise.then(({ data, error }) => {
    if (error) {
      const title = !error?.graphQLErrors.length ? "Network error:" : "Error:";
      const message = error?.graphQLErrors.length
        ? error?.graphQLErrors[0].message
        : error?.networkError?.message;

      notifications.show({ color: "red", title, message: message ?? "" });
      onError?.(error);
    } else if (data) {
      if (successMsg)
        notifications.show({
          color: "green",
          title: "Success: ",
          message: successMsg
        });
      onSuccess?.(data);
    }
  });
}

export const withoutTypeName = (obj: Record<string, any>) => {
  const { __typename, ...rest } = obj;
  return rest;
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
