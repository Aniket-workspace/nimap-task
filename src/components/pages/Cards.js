import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const ImageURL = "https://image.tmdb.org/t/p/w500";

const Cards = ({ id, vote_average, poster_path, original_title }) => {
  const limitWords = (text, maxWords) => {
    const words = text.split(" ");
    return (
      words.slice(0, maxWords).join(" ") +
      (words.length > maxWords ? "..." : "")
    );
  };

  return (
    <NavLink to={`/movie/${id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          maxWidth: 200,
          margin: "20px 10px 20px 10px",
          padding: 1,
          bgcolor: "#393939",
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={ImageURL + poster_path}
            alt="Movie"
            sx={{ height: "250px", width: "190px" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="body"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {limitWords(original_title, 3)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "12px",
              }}
            >
              Rating: {vote_average}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  );
};

export default Cards;
