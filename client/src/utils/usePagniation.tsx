import { useState } from "react";

export const usePagniation = () => {
  const [page, onPageChange] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  return {
    page,
    onPageChange,
    recordsPerPage,
    setRecordsPerPage,
  };
};
