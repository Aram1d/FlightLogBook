import { useState } from "react";
import React from "react";

type UsePaginationProps = {
  pageSizes: number[];
  shift?: number | string;
};

export const usePagination = ({
  pageSizes = [],
  shift: _s = ""
}: UsePaginationProps) => {
  const [_shift, onShiftChange] = React.useState(_s);
  const [page, onPageChange] = useState(1);
  const [limit, onLimitChange] = useState(10);
  const shift = typeof _shift === "string" ? 0 : _shift;

  return [
    { page, limit, shift },
    (total: number | null | undefined) => ({
      page,
      limit,
      onPageChange,
      onLimitChange,
      total: total ?? 0,
      availableLimits: pageSizes,
      shift,
      onShiftChange
    })
  ] as const;
};
