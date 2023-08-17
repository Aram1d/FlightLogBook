import { useState } from "react";

export const usePagniation = () => {
  const [page, onPageChange] = useState(1);
  const [recordsPerPage, onRecordsPerPageChange] = useState(10);

  return {
    page,
    onPageChange,
    recordsPerPage,
    onRecordsPerPageChange,
  };
};
