"use client";

import React from "react";
import { Pagination, Stack } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination = ({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) => {
  return (
    <Stack spacing={2} alignItems="center" className="py-4">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onChange}
        color="primary"
        shape="rounded"
        variant="outlined"
        size="medium"
      />
    </Stack>
  );
};

export default CustomPagination;
