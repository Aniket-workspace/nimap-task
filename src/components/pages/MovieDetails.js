import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid2, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import UserImg from "../assets/images/user.png";
import CircularProgress from "@mui/material/CircularProgress";

const IMAGE_URL = "https://image.tmdb.org/t/p/w200"; // Base image URL

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        if (!movieResponse.ok) {
          throw new Error("Failed to fetch movie details.");
        }
        const movieData = await movieResponse.json();
        setDetails(movieData);
        console.log(movieData);

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        if (!creditsResponse.ok) {
          throw new Error("Failed to fetch movie credits.");
        }
        const creditsData = await creditsResponse.json();

        setCast(creditsData.cast);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovieDetails();
    window.scroll(0, 0);
  }, [id]);

  if (!details || cast.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const {
    original_title,
    vote_average,
    runtime,
    genres,
    release_date,
    overview,
    poster_path,
    backdrop_path,
  } = details;
  const formattedDate = new Date(release_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const gener = genres;
  console.log(gener[0]);

  return (
    <>
      <div>
        <Box m={5}>
          <Box
            color={"#fff"}
            p={1.5}
            borderRadius={"8px"}
            bgcolor={"#303030"}
            sx={{
              flexGrow: 1,
              // opacity: "0.1",
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop_path})`,
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }}
          >
            <Grid2 container spacing={2}>
              <Grid2 container size={{ xs: 12, md: 6 }}>
                <Grid2 size={{ xs: 12, sm: 3.5, md: 3 }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                    alt="movie"
                    className="movie-item"
                    width={"100%"}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 7, md: 8 }}>
                  <Typography variant="h6" sx={{ lineHeight: 2 }}>
                    {original_title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ lineHeight: 2.5, fontSize: "16px" }}
                  >
                    Rating : {vote_average}
                  </Typography>

                  <Typography variant="body2">
                    <Typography variant="span" color="primary" mr={2}>
                      {runtime} min
                    </Typography>
                    {gener.map((item) => {
                      return item.name + ",";
                    })}{" "}
                  </Typography>

                  <Typography variant="body2">
                    Realise Date : {formattedDate}
                  </Typography>
                </Grid2>

                <Grid2 size={12}>
                  <Typography variant="h6">Overview</Typography>
                  <Typography variant="body2" sx={{ textAlign: "justify" }}>
                    {overview}
                  </Typography>
                </Grid2>
              </Grid2>

              <Grid2 size={6} sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                  alt="bg-"
                  className="item-images"
                  width={"100%"}
                  height={"100%"}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Box>
        <Box pl={6} color={"#fff"}>
          {" "}
          <Typography variant="h5">Cast</Typography>{" "}
        </Box>{" "}
        <Box
          display={"flex"}
          p={2}
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {cast.map((actor) => (
            <Card
              sx={{
                maxWidth: 200,
                margin: "20px 10px 20px 10px",
                bgcolor: "#393939",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  // height="140"
                  image={
                    actor.profile_path
                      ? `${IMAGE_URL}${actor.profile_path}`
                      : UserImg // Use a default image if no profile_path is available
                  }
                  alt={actor.name}
                  sx={{ width: "200px", height: "220px" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {actor.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {actor.character}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </div>
    </>
  );
};

export default MovieDetails;
