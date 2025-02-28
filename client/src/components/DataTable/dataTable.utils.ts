import { Key } from "react";
import { compact, last } from "lodash-es";
import {
  DataTableExpansion,
  DataTableRow,
  DataTableSelection
} from "./DataTable.types";

export function castStateValue<T>(
  value: T | null | undefined
): T[] | undefined {
  return value === undefined ? undefined : value === null ? [] : [value];
}

export function itemEnabledFor<T>(
  item: T,
  feature?: DataTableSelection<T> | DataTableExpansion<T>
) {
  return Boolean(feature && !feature.disabled?.(item));
}

export function toggleRows<T>(
  rows: DataTableRow<T>[],
  map: Map<Key, T>,
  multiple?: boolean
) {
  const result = new Map(map);
  for (const { key, item } of rows) {
    if (map.has(key)) {
      result.delete(key);
    } else {
      result.set(key, item);
    }
  }
  const final = [...result.values()];
  return multiple ? final : compact([last(final)]);
}
