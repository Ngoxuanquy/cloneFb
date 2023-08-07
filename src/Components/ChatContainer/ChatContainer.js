import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "../ChatInput/ChatInput";
// import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import Cookies from 'js-cookie';
import "./index.css"
import { io } from "socket.io-client";

export default function ChatContainer({ currentChat, socket }) {

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const URL = process.env.REACT_APP_URL;



  //Socket.io
  const socketGroup = useRef();


  useEffect(() => {
    const id = Cookies.get('id');
    const cleanId = id ? id.replace(/^"|"$/g, '') : "";
    socketGroup.current = io("http://localhost:3056");
    socketGroup.current.emit("add-user", currentChat._id);
  }, []);



  const getApiMess = () => {
    const token = Cookies.get('accessToken');
    const id = Cookies.get('id');
    const name = Cookies.get('name');

    const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
    const cleanId = id ? id.replace(/^"|"$/g, '') : "";
    const cleanName = name ? name.replace(/^"|"$/g, '') : "";


    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_KEY,
        "x-client-id": cleanId,
        "authorization": cleanedJwtString
      },
      body: JSON.stringify({
        from: cleanId,
        to: currentChat?.array_user,
        array_id: currentChat?._id
      })
    };
    // lấy apis bản thân
    fetch(URL + '/messages/getmsg', requestOptions)
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        setMessages(data);

      })
  }

  useEffect(() => {
    getApiMess()
  }, [currentChat || socketGroup]);



  const handleSendMsg = async (msg) => {

    const data = await JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );

    currentChat.array_Id?.map(array => {
      socketGroup.current?.emit("send-msg", {
        to: array,
        from: data._id,
        msg,
      });
    })


    socket.current?.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    const token = Cookies.get('accessToken');
    const id = Cookies.get('id');
    const name = Cookies.get('name');

    const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
    const cleanId = id ? id.replace(/^"|"$/g, '') : "";
    const cleanName = name ? name.replace(/^"|"$/g, '') : "";

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_KEY,
        "x-client-id": cleanId,
        "authorization": cleanedJwtString
      },
      body: JSON.stringify({
        from: cleanId,
        to: currentChat.array_user,
        message: msg,
        array_Id: currentChat._id,
        name: cleanName
      })
    };
    // lấy apis bản thân
    fetch(URL + '/messages/addmsg', requestOptions)
      .then(() => {

        socketGroup.current?.emit("sendNotification", {
          senderName: cleanId,
          receiverName: cleanId,
          type: msg,
          toID: currentChat._id,
          toName: cleanName
        });

        socket.current?.emit("sendNotification", {
          senderName: cleanId,
          receiverName: cleanId,
          type: msg,
          toID: currentChat._id,
          toName: cleanName
        });

      })

    const msgs = [...messages];

    msgs.push({ fromSelf: true, message: msg });


    setMessages(msgs);
    getApiMess()

  };


  const [notifications, setNotification] = useState([])

  useEffect(() => {
    socketGroup.current?.on("getNotification", (data) => {
      return getApiMess()
    });
    socket.current?.on("getNotification", (data) => {
      return getApiMess()
    });
  }, [currentChat]);


  useEffect(() => {
    socketGroup.current?.on("msg-recieve", (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    });

  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };


  const handleEmojiClick = (event, emojiObject) => {

    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg?.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };


  return (
    <div className="text-white">
      <div className="chat-header">
        <div className="user-details" style={{
          marginTop: '20px'
        }}>
          <div className="avatar">
            <img
              src={`https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg`}
              alt=""
              className="w-[40px] h-[40px]"
            />
          </div>
          <div className="username">
            <h3>{currentChat.name}</h3>
          </div>
        </div>
        {/* <Logout /> */}
      </div>
      <div className="chat-messages" >
        {messages?.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content">
                  <p>{message.name}</p>
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="button-container">
        <div className="emoji" >
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>

      <form className="input-container" onSubmit={(event) => sendChat(event)} style={{
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }} >

          <input
            type="text"
            placeholder="type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            style={{
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '10px',
              fontSize: '16px',
              width: '90%',
              boxSizing: 'border-box',
              height: '50px', // Increase the height to 200px
              color: 'black',
              marginLeft: '50px'

            }}
          />
          <button type="submit" className="text-white" onClick={() => handleSendMsg()}
            style={{
              marginLeft: "-30px",
              color: 'black'
            }}
          >
            <IoMdSend color="black" />
          </button>
        </div>
      </form>

    </div >
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
  
`;


