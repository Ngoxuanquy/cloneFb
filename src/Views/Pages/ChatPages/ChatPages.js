import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
// import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../../../Components/ChatContainer/ChatContainer";
import Cookies from 'js-cookie';
import Contacts from "../../../Components/Contacts/Contacts";
import Welcome from '../../../Components/Welcome/Welcome'
// import Header from "../../../Components/Header/Header.js";
import Header from "../../../Components/Header/Header"
import { Spin, } from 'antd';

export default function ChatPages() {

    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    const [currentUser, setCurrentUser] = useState();
    const URL = process.env.REACT_APP_URL;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("chat-app-current-user")) {
            navigate("/login");
        } else {
            setCurrentUser(
                JSON.parse(localStorage.getItem("chat-app-current-user"))
            );
        }
    }, []);


    useEffect(() => {
        if (currentUser) {
            const id = Cookies.get('id');
            const cleanId = id ? id.replace(/^"|"$/g, '') : "";

            socket.current = io("http://localhost:3056");
            socket.current.emit("add-user", cleanId);
        }
    }, [currentUser]);


    // useEffect(async () => {
    //     if (currentUser) {
    //         if (currentUser.isAvatarImageSet) {
    //             const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    //             setContacts(data.data);
    //         } else {
    //             navigate("/setAvatar");
    //         }
    //     }
    // }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };



    //api user
    const [apiUsers, setApiUsers] = useState([])
    const [groupMess, setGroupMess] = useState([])


    useEffect(() => {
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
        };

        console.log({ requestOptions })

        // tạo thêm bài viết
        fetch(URL + '/user/getFullUser', requestOptions)
            .then((data) => data.json())
            .then((data) => {
                console.log({ data })
                const filteredData = data?.metadata?.filter((user) => user?._id !== cleanId) || [];
                setApiUsers(filteredData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });


        fetch(URL + '/groupMess/getGroup/' + cleanId, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setLoading(false)
                setGroupMess(data.metadata)
            })
    }, [])


    return (
        <div className=" ">
            {loading == true &&
                <Spin spinning={loading} delay={500} className='z-100 w-[90%] flex justify-center items-center h-[100%] '
                    style={{
                        position: 'fixed',
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        height: '100%',
                        zIndex: 1000000,
                        top: 0,
                        left: 0,
                        right: 0
                    }}
                />
            }
            <Header />
            <Container>
                <div className="container">
                    <Contacts contacts={apiUsers} changeChat={handleChatChange} groupMess={groupMess} />
                    {currentChat === undefined ? (
                        <Welcome />
                    ) : (
                        <ChatContainer currentChat={currentChat} socket={socket} />
                    )}
                </div>
            </Container>
        </div>
    );
}


const Container = styled.div`
height: calc(100% - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 100%;
    width: 85vw;
    // background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
