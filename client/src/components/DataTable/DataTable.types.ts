import { Key, ReactNode } from "react";
import { BoxProps, TableTdProps } from "@mantine/core";

export type StateHandlers<K extends string, T> = {
  [k in K]?: T;
} & {
  [k in `default${Capitalize<K>}`]?: T;
} & {
  [k in `on${Capitalize<K>}Change`]?: (value: T) => void;
};

export interface DataTableColumn<T> extends BoxProps {
  title?: ReactNode;
  hidden?: boolean;
  render: (item: T, row: DataTableRow<T>) => ReactNode;
  onCellClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    {
      item,
      row,
      column
    }: {
      item: T;
      row: DataTableRow<T>;
      column: DataTableColumn<T>;
    }
  ) => void;
}

export type DataTableFooterColumn<T> =
  | (TableTdProps & {
      render: (item: T) => ReactNode;
    })
  | null;

export interface DataTableRow<T> {
  item: T;
  key: Key;
  index: number;
  expanded: boolean;
  selected: boolean;
  expandable: boolean;
  selectable: boolean;
}

export interface DataTableExpansion<T> extends StateHandlers<"expanded", T[]> {
  multiple?: boolean;
  forceExpanded?: boolean;
  disabled?: (item: T) => boolean;
  render: (item: T, row: DataTableRow<T>) => ReactNode;
}

export type DataTableSelection<T> = {
  disabled?: (item: T) => boolean;
} & (
  | ({ multiple: true } & StateHandlers<"selection", T[]>)
  | ({ multiple?: false } & StateHandlers<"selection", T | null>)
);

export interface DataTablePagination extends StateHandlers<"page", number> {
  total: number;
  limit: number;
  onLimitChange?: (limit: number) => void;
  availableLimits?: number[];
  shift?: number | null;
  onShiftChange?: (shift: number | string) => void;
}
