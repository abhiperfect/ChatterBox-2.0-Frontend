import React, { useState } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { bgcolor } from "../../constants/color";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchDialog from "../specific/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
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
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const [isSearch, setIsSearch] = useState(false);
    const openSearch = () => {
      setIsSearch((prev) => !prev);
    };

    return (
      <>
        <Title />
        <Header isSearch={isSearch} setIsSearch={setIsSearch} />
        <Grid container height={"91vh"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            height="100%"
            bgcolor={bgcolor}
          >
            <Search 
            style={{
              marginBottom:'3rem'
            }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Friend…"
                inputProps={{ "aria-label": "search" }}
                onClick={openSearch}
              />
            </Search>
            <Divider/>
            {isSearch ? <SearchDialog/> : <Profile />}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
            bgcolor={bgcolor}
          >
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            bgcolor={bgcolor}
          >
            <ChatList
              chats={samepleChats}
              chatId={chatId}
              newMessagesAlert={[
                {
                  chatId: "1",
                  count: "4",
                },
              ]}
              onlineUsers={["1", "2"]}
            />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
