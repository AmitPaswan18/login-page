import Pagination from "@mui/material/Pagination";

import Stack from "@mui/material/Stack";

export default function PaginationControlled({ page, onPageChange }) {
  return (
    <Stack spacing={2}>
      <Pagination count={10} page={page} onChange={onPageChange} />
    </Stack>
  );
}
