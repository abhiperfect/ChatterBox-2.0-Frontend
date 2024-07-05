import React, { useState } from "react";
import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { samepleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { bgcolor } from "../../constants/color";
import SimpleContainer from "../common/SimpleContainer";
import SearchBar from "../common/SearchBar";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useSelector } from "react-redux";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
   
    const addFriendHandler = async (id) => {};
    const { isSearch } = useSelector(
      (state) => state.misc
    );

    const [users, setUsers] = useState(sampleUsers);
    const isLoadingSendFriendRequest = true;
    const sendFriendRequest = true;

    return (
      <>
        <Title />
        <Header />
        <Grid
          container
          height={"91vh"}
          style={{
            padding: "0px",
            margin: "0px",
          }}
        >
          <Grid
            item
            sm={4}
            md={3}
            padding={"0px"}
            sx={{
              display: { xs: "none", sm: "block" },
              bgcolor: "rgba(0,0,0,0.85)",
            }}
            height="100%"
            bgcolor={bgcolor}
          >
            <Container
              style={{
                padding: "0px",
              }}
            >
              <SearchBar/>
              <SimpleContainer height="81vh" cursor="pointer">
                {isSearch && (
                  <Box>
                    {users.map((i) => (
                      <UserItem
                        user={i}
                        key={i._id}
                        handler={addFriendHandler}
                        handlerIsLoading={isLoadingSendFriendRequest}
                      />
                    ))}
                  </Box>
                )}
                {!isSearch && <Profile />}
              </SimpleContainer>
            </Container>
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
