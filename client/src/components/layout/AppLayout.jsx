import React, { useState, useRef, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useMyChatsQuery } from "../../redux/api/api";
import { Skeleton, Drawer } from "@mui/material";
import { useSocket } from "../../socket";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";
import { useErrors, useSocketEvents, useAsyncMutation } from "../../hooks/hook";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";


import {
  setIsDeleteMenu,
  setIsMobile,
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const socket = useSocket();
    const deleteMenuAnchor = useRef(null);
    
    const [searchUser] = useLazySearchUserQuery();
  
    const [ search, setSearch ] = useState();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const { newMessagesAlert } = useSelector((state) => state?.chat);
    const { user } = useSelector((state)=>(state?.auth));

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    const handleMobileClose = () => dispatch(setIsMobile(false));
    const { isMobile } = useSelector((state) => state.misc);

    const { isSearch } = useSelector((state) => state.misc);

    const [users, setUsers] = useState([]);

    const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
      useSendFriendRequestMutation
    );

    const addFriendHandler = async (id) => {
      await sendFriendRequest("Sending friend request...", { userId: id });
    };
  
    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    useEffect(() => {
      const timeOutId = setTimeout(() => {
        searchUser(search)
          .then(({ data }) => setUsers(data.users))
          .catch((e) => console.log(e));
      }, 1000);
  
      return () => {
        clearTimeout(timeOutId);
      };
    }, [search]);

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
              <SearchBar  setSearch={setSearch} />
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
                {!isSearch && <Profile user={user} />}
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
            <WrappedComponent {...props}  chatId={chatId} user={user} />
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
            <DeleteChatMenu
              dispatch={dispatch}
              deleteMenuAnchor={deleteMenuAnchor}
            />
            {isLoading ? (
              <Skeleton />
            ) : (
              // <Drawer open={isMobile} onClose={handleMobileClose}>
                <ChatList
                  chats={data?.chats}
                  chatId={chatId}
                  handleDeleteChat={handleDeleteChat}
                  newMessagesAlert={newMessagesAlert}
                  onlineUsers={onlineUsers}
                />
              // </Drawer>
            )}
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
