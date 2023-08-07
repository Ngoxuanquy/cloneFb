import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat, groupMess }) {


  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [apis, setApis] = useState([]);


  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );
    setCurrentUserName(data.name);
    setCurrentUserImage(data.avatarImage);
    const combinedArray = contacts.concat(groupMess);
    setApis(combinedArray)
  }, [groupMess]);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  console.log({ apis })


  return (
    <div className="h-[700px]">
      <Container>
        <div className="brand">
          {/* <img src={Logo} alt="logo" /> */}
          <h3>snappy</h3>
        </div>
        <div className="contacts" style={{
          height: '530px'
        }} >
          {apis?.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""
                  }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                {contact?.img ?

                  <div className="avatar">
                    <img
                      src={contact?.img}
                      alt=""
                    />
                  </div>
                  :
                  <div className="avatar">
                    <img
                      src={`https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg`}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                }
                <div className="username">
                  <h3>{contact.name}</h3>

                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    </div>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
