import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

const Search = () => {
  const [data, setData] = useState([]);
  const { key } = useParams();

  useEffect(() => {
    getAllData(key);
  }, [key]);

  async function getAllData(movie) {
    const apiData = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${movie}&page=1`
    );
    const res = await apiData.json();
    console.log(res.results);
    setData(res.results);
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
    </>
  );
};
export default Search;
