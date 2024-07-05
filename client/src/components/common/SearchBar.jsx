import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  searchBarBGColor,
  searchBarTextColor,
  searchBarInsetBoxShadow,
} from "../../constants/color";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
function SearchBar({ setSearch }) {
  const dispatch = useDispatch();

  const openSearch = () => dispatch(setIsSearch(true));

  const closeSearchBar = () => {
    dispatch(setIsSearch(false));
  };

  const handleInputChange = async (event) => {
    setSearch(event.target.value);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: " #272626",
        color: searchBarTextColor,
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Search
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
        <Input
          placeholder="Find Friends..."
          fullWidth={true}
          onChange={handleInputChange}
          onClick={openSearch}
        ></Input>
        <CloseIcon onClick={closeSearchBar} sx={{ cursor: "pointer" }} />
      </Search>
    </AppBar>
  );
}

export default SearchBar;
