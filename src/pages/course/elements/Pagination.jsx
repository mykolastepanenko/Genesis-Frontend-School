import { Stack, Pagination as MUIPagination } from "@mui/material";

function Pagination({ count, currentPage, changePageHandler }) {
  return (
    <Stack sx={{ mt: 5 }}>
      <MUIPagination
        sx={{ mx: "auto" }}
        count={count}
        variant="outlined"
        shape="rounded"
        color="primary"
        page={currentPage}
        onChange={changePageHandler}
      />
    </Stack>
  );
}
export default Pagination;
