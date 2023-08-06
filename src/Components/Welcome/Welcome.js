import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Modal } from "antd";
import Cookies from 'js-cookie';

export default function Welcome() {


  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(
      JSON.parse(
        localStorage.getItem("chat-app-current-user")
      ).name
    );
  }, []);


  const URL = process.env.REACT_APP_URL;

  const [apiUses, setApiUsers] = useState([])
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

    // tạo thêm bài viết
    fetch(URL + '/user/getFullUser', requestOptions)
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        const filteredData = data.metadata?.filter((user) => user._id !== cleanId);
        setApiUsers(filteredData)
      })

    //get nofitication
    // tạo thêm bài viết

  }, [])

  //tạo modal 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };


  //xưt lý nhwungx ng add thêm vào mảng
  const [newArrays, setNewArray] = useState([])
  const handlerAddGroup = (apiUse) => {
    setNewArray(pre => [...pre, apiUse])
  }

  console.log({ newArrays })

  const handleOk = () => {
    const token = Cookies.get('accessToken');
    const id = Cookies.get('id');
    const name = Cookies.get('name');

    const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
    const cleanId = id ? id.replace(/^"|"$/g, '') : "";
    const cleanName = name ? name.replace(/^"|"$/g, '') : "";

    const data = JSON.parse(
      localStorage.getItem("chat-app-current-user")
    );

    const requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_KEY,
        "x-client-id": cleanId,
        "authorization": cleanedJwtString
      },
      body: JSON.stringify({
        payload: [...newArrays, data]
      })
    };

    // tạo thêm bài viết
    fetch(URL + '/groupMess/addGroup/', requestOptions)
      .then(() => {
        setIsModalOpen(false);

      })


  }

  return (
    <Container>
      {/* <img src={Robot} alt="" /> */}
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
      <div>
        <Button className="mt-[10px] bg-[#eeeee]" onClick={showModal}>
          Tạo group chat
        </Button>
      </div>
      <Modal title="Thêm bạn vào group" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          {
            apiUses?.map(apiUse => (
              <div className="mt-[15px] flex flex-row justify-between">
                <div className="flex flex-row">
                  <div>
                    {apiUse.img ?
                      <img src={apiUse.img}
                        className="w-[40px] h-[40px]"
                      />
                      :
                      <img src="https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                        className="w-[40px] h-[40px]"
                      />
                    }
                  </div>
                  <div className="ml-[5px]">
                    {apiUse.name}
                  </div>

                </div>

                <Button onClick={() => handlerAddGroup(apiUse)}>
                  Thêm
                </Button>

              </div>


            ))
          }

          <div>
            <div>
              <div className="text-[17px] mt-[20px]">
                Những người đã add
              </div>
              <div>
                {newArrays.map(newArray => (
                  <div className="mt-[15px] flex flex-row justify-between">
                    <div className="flex flex-row">
                      <div>
                        {newArray.img ?
                          <img src={newArray.img}
                            className="w-[40px] h-[40px]"
                          />
                          :
                          <img src="https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
                            className="w-[40px] h-[40px]"
                          />
                        }
                      </div>
                      <div className="ml-[5px]">
                        {newArray.name}
                      </div>

                    </div>

                    <div>
                      <Button onClick={() => handlerAddGroup(newArray)}>
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </Modal>
    </Container >
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
