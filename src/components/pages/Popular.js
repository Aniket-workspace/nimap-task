import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Box, Button, Typography } from "@mui/material";
import PaginationComp from "../Pagination";
import { useNavigate } from "react-router-dom";

const Popular = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [handelPage, setHandelPage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllData();
  }, [page]);

  async function getAllData() {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
    );
    const res = await apiData.json();
    console.log(res.results);
    setData(res.results);
    setNumberOfPages(res.total_pages);
    setHandelPage(page);
  }

  return (
    <>
      {handelPage > 500 ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              height: "100vh",
              marginTop: "auto",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5">Page dosen't exist</Typography>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ marginTop: "20px" }}
                onClick={() => {
                  navigate("/");
                  setPage(1);
                }}
              >
                Go to home page
              </Button>
            </Box>
          </Box>
          {/* <PaginationComp setPage={setPage} totalPages={numberOfPages} /> */}
        </>
      ) : (
        <>
          <Box
            display={"flex"}
            p={2}
            sx={{ flexWrap: "wrap", justifyContent: "space-evenly" }}
          >
            {data?.map((item) => (
              <Cards {...item} key={item.id} />
            ))}
          </Box>
          <PaginationComp setPage={setPage} totalPages={numberOfPages} />
        </>
      )}
    </>
  );
};

export default Popular;
