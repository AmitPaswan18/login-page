import Pagination from "@mui/material/Pagination";
import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
export default function PaginationControlled({
  page,
  onPageChange,
  pageCount,
}) {
  return (
    <Stack spacing={2}>
      <Pagination count={pageCount} page={page} onChange={onPageChange} />
    </Stack>
  );
}

PaginationControlled.propTypes = {
  page: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
};
