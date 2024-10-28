import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Popular from "./components/pages/Popular";
import TopRated from "./components/pages/TopRated";
import MovieDetails from "./components/pages/MovieDetails";
import Upcoming from "./components/pages/Upcoming";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./Theme";
import Search from "./components/pages/Search";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Popular />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search/:key" element={<Search />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
