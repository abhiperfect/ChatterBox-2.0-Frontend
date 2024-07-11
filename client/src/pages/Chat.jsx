import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, blue } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { useSocket } from "../socket.jsx";
import {
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
  NEW_MESSAGE_ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../constants/events.js";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useDispatch } from "react-redux";
import { TypingLoader } from "../components/layout/Loader";
import { useNavigate } from "react-router-dom";
import { useSocketEvents } from "../hooks/hook.jsx";
import { sampleMessage } from "../constants/sampleData.js";
import {
  incrementNotification,
  setNewMessagesAlert,
  removeNewMessagesAlert,
  setNewOnlineUsers,
} from "../redux/reducers/chat.js";
import { useParams } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(sampleMessage);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [chatID, setChatID] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);

  const chatDetails = useChatDetailsQuery({ chatId }, { skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const handleFileOpen = () => {};

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const newMessageAlertListener = useCallback(
    (data) => {
      if (data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data));
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const onlineUsersListener = useCallback((data) => {
    dispatch(setNewOnlineUsers(data));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(NEW_MESSAGE, newMessagesListener);
    socket.on(NEW_MESSAGE_ALERT, newMessageAlertListener);
    socket.on(START_TYPING, startTypingListener);
    socket.on(STOP_TYPING, stopTypingListener);
    socket.on(ONLINE_USERS, onlineUsersListener);

    return () => {
      socket.off(NEW_MESSAGE, newMessagesListener);
      socket.off(NEW_MESSAGE_ALERT, newMessageAlertListener);
      socket.off(START_TYPING, startTypingListener);
      socket.off(STOP_TYPING, stopTypingListener);
      socket.off(ONLINE_USERS, onlineUsersListener);
    };
  }, [socket, chatId]);

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      // setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    dispatch(removeNewMessagesAlert(chatId));
  }, [removeNewMessagesAlert, chatId]);

  useEffect(() => {
    return () => {
      setMessages([]);
      setMessage("");
      setPage(1);
    };
  }, [chatId, setMessages]);

  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {messages?.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={messageOnChange}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: blue,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </Fragment>
  );
};

export default AppLayout(Chat);
