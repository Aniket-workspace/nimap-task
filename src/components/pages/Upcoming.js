import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { Box } from "@mui/material";
import PaginationComp from "../Pagination";

const Upcoming = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    getAllData();
  }, [page]);

  async function getAllData() {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
    );
    const res = await apiData.json();
    console.log(res.results);
    setData(res.results);
    setNumberOfPages(res.total_pages);
  }

  return (
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

      <PaginationComp setPage={setPage} pageNumber={numberOfPages} />
    </>
  );
};

export default Upcoming;
