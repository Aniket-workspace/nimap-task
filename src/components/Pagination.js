// import { ThemeProvider } from "@emotion/react";
import { Pagination, Stack } from "@mui/material";
import React from "react";

const PaginationComp = ({ setPage, totalPages }) => {
  const handleChange = (pages) => {
    setPage(pages);
    window.scroll(0, 0);
  };

  return (
    <>
      <Stack spacing={2} p={3} alignContent={"center"}>
        <Pagination
          onChange={(e) => {
            handleChange(e.target.textContent);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          size="small"
          count={totalPages}
        />
      </Stack>
    </>
  );
};
export default PaginationComp;
