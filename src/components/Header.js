import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Drawer, Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "150px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = () => {
  const [value, setValue] = useState("/");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setKey(e.target.value);
  };

  const drawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const drawewr = (
    <Box onClick={drawerToggle} sx={{ textAlign: "center" }}>
      <Box mt={4} mb={2} display={"flex"} justifyContent={"center"}>
        <Typography
          variant="h6"
          borderRadius={10}
          bgcolor={"#202020"}
          width={140}
          p={1}
        >
          MoviesDB
        </Typography>
      </Box>
      <Box sx={{ width: "100%", display: { xs: "block", sm: "none" } }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          orientation="vertical"
        >
          <Tab value="/" label="Popular" onClick={() => navigate("/")} />
          <Tab
            value="/top-rated"
            label="Top Rated"
            onClick={() => navigate("/top-rated")}
          />
          <Tab
            value="/upcoming"
            label="Upcoming"
            onClick={() => navigate("/upcoming")}
          />
        </Tabs>
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#393939" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "space-between" },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={drawerToggle}
              sx={{
                mr: { xs: "", sm: 2 },
                display: { xs: "block", sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: { xs: "12px", sm: "20px" }, fontWeight: "bold" }}
              mr={1}
            >
              MoviesDB
            </Typography>

            <Box display={"flex"} alignItems={"center"}>
              <Box sx={{ width: "100%", display: { xs: "none", sm: "block" } }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                >
                  <Tab
                    value="/"
                    label="Popular"
                    onClick={() => navigate("/")}
                  />
                  <Tab
                    value="/top-rated"
                    label="Top Rated"
                    onClick={() => navigate("/top-rated")}
                  />
                  <Tab
                    value="/upcoming"
                    label="Upcoming"
                    onClick={() => navigate("/upcoming")}
                  />
                </Tabs>
              </Box>

              <form style={{ display: "flex", alignItems: "center" }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon color="secondary" />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleInputChange}
                  />
                </Search>

                <Box p={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ color: "#fff", borderColor: "#fff" }}
                  >
                    <NavLink
                      to={`/search/${key}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      search
                    </NavLink>
                  </Button>
                </Box>
              </form>
            </Box>
          </Toolbar>
        </AppBar>

        {/* mobile nav */}
        <Box component={"nav"}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={drawerToggle}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "200px",
                backgroundColor: "#393939",
              },
            }}
          >
            {drawewr}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};
export default Header;
