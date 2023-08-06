import React, { useEffect, useState, useRef } from 'react'
import {
    NodeCollapseOutlined,
    MessageOutlined,
    UserOutlined,
    SettingOutlined,
    HeatMapOutlined,
    LogoutOutlined,
    NotificationTwoTone,
    AntDesignOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Segmented, Button, Space, Avatar } from 'antd';
import { Badge, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Divider, Tooltip, Popover } from 'antd';
import PostsProFile from '../../../Components/PostsProFile/PostsProFile';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import StoryProfile from '../../../Components/StoryProfile/StoryProfile';


function ProfilePages() {

    const { searchKey } = useParams();
    const [options, setOptions] = useState(['Home', 'Video', 'Monthly']);
    const [moreLoaded, setMoreLoaded] = useState(false);
    const navigate = useNavigate();
    //xử lý sự kiện nhấn nút đăng ký
    const URL = process.env.REACT_APP_URL;

    //xử lý khi nhấn nút thêm
    const handleLoadOptions = () => {
        setOptions((prev) => [...prev, 'Quarterly', 'Yearly']);
        setMoreLoaded(true);
    };

    //Khia báo modal để đăng bài viết
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Khia báo modal để mở message
    const [isModalOpen_mess, setIsModalOpenMess] = useState(false);

    const showModal_mess = () => {
        setIsModalOpenMess(true);
    };

    const handleOk_mess = () => {
        setIsModalOpenMess(false);
    };

    const handleCancel_mess = () => {
        setIsModalOpenMess(false);
    };


    const [loading, setLoading] = useState(true);

    //set name
    const [names, setName] = useState('')

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const name = Cookies.get('name');

        const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        const cleanName = name ? name.replace(/^"|"$/g, '') : "";

        setName(cleanName)

    }, [])

    //lấy apis của tất cả bài đăng

    const [apis, setApi] = useState([])
    const [apiusers, setApiUser] = useState([])
    const [apiFriend, setApiFriend] = useState([])


    //xử lý load lại apis khi kết bạn
    const ApiAddFriend = () => {
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
                userId: cleanId,
                youId: searchKey
            })
        };
        // lấy apis bản thân
        fetch(URL + '/friends/getNameById', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setApiFriend(data.metadata)
            })
    }

    const [checkfriend, setApiCheckFriend] = useState([])


    //xử lý load lại apis khi kết bạn
    const ApiCheckFriend = () => {
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
                userId: cleanId,
                youId: searchKey
            })
        };
        // lấy apis bản thân
        fetch(URL + '/friends/checkxacnhanBanBe', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setApiCheckFriend(data.metadata)
            })
    }


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
        fetch(URL + '/getAllById?user_id=' + searchKey, requestOptions)
            .then((data) => {
                return data.json()

            })
            .then((data) => {
                setApi(data.metadata)
            })

        // tạo thêm bài viết
        fetch(URL + '/user/getNameById/' + searchKey, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setApiUser([data.metadata])
            })



        // gọi hàm để check có kết bạn hay k
        ApiAddFriend();
        ApiCheckFriend()

    }, [])

    const handleSegmentedChange = (value) => {
        navigate(`/${value}`);
    };

    //socket.io
    const socket = useRef();

    useEffect(() => {
        const id = Cookies.get('id');
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        socket.current = io("http://localhost:3056");
        socket.current.emit("add-user", cleanId);
    }, []);


    //check đã kết bạn hay chưa
    const [checkFriend, setCheckFriend] = useState()

    //xử lý add friend 
    const handerAddFriend = (youId) => {
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
                userId: cleanId,
                youId: youId
            })

        };

        fetch(URL + '/friends/addFriend', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                // window.location.reload();
                socket.current.emit("sendNotification", {
                    senderName: cleanId,
                    receiverName: cleanId,
                    type: "Kết Bạn",
                    toID: youId,
                    toName: cleanName
                });
                ApiAddFriend();

            })
    }

    //xử lý xóa friend 
    const handerDeleteFriend = (youId) => {
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
                userId: cleanId,
                youId: youId
            })

        };

        fetch(URL + '/friends/deleteFriend', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                // window.location.reload();
                ApiAddFriend();

                console.log(data)
            })
    }

    const content = (id) => {
        console.log(id)
        return (
            <div>
                <div>
                    <button onClick={() => handerClick(id)}>
                        Xác Nhận
                    </button>
                </div>
            </div>
        )
    }

    const handerClick = (youId) => {
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
                userId: cleanId,
                youId: youId
            })

        };

        fetch(URL + '/friends/XacNhanFriend', requestOptions)
            .then((data) => {
                window.location.reload();
            })

    }

    const content_huyKB = (id) => {
        console.log(id)
        return (
            <div>
                <div>
                    <button onClick={() => handerClick_huyKB(id)}>
                        Hủy Kết Bạn
                    </button>
                </div>
            </div>
        )
    }

    const handerClick_huyKB = (youId) => {

        console.log({ youId })
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
                youId: cleanId,
                userId: youId
            })

        };

        fetch(URL + '/friends/deleteFriend', requestOptions)
            .then(() => {
                window.location.reload();
            })

    }



    return (
        <div>
            <div className="text-3xl text-black min-h-screen flex flex-row">

                <div className='bg-[#eeeeee] w-full h-[60px] text-balck bg-[#1c1e21] ' style={{
                    backgroundColor: '#001529',
                    borderBottom: '2px solid gray',
                    borderTop: '2px solid gray',
                    zIndex: 1

                }}>
                    <div className=' mr-[20px] mt-[7px] '>
                        <div className='text-white flex flex-row justify-between '>
                            <div className='flex flex-row'>
                                <button onClick={() => navigate('/')}>
                                    <img src='https://scontent.xx.fbcdn.net/v/t1.15752-9/364546539_257212453762056_7830584812463434640_n.jpg?stp=dst-jpg_s206x206&_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=aee45a&_nc_ohc=DK4d1vek3lcAX9uTRvj&_nc_oc=AQmpRG8BcO_knJX7sU2QUXK330FkAKPn4TzMjt2BXj6IStpXtz1RiSZPhVhh6ff6zLatSu_Vw633_cxgNH6P67sO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRuLVf2zgauhC6Y14wlED8jJVjgzsDxdfmKyBLEcMDC0A&oe=64F6D923'
                                        className='w-[45px] h-[45px] rounded-full mt-[-2px] ml-[20px]'
                                    />
                                </button>
                                <input
                                    type="text" // Change the type based on the input you want (text, number, email, etc.)
                                    className="p-2"
                                    placeholder="Tìm kiếm ...."
                                    style={{
                                        height: '40px',
                                        fontSize: "13px",
                                        width: '210px',
                                        // marginTop: '-20px',
                                        marginLeft: '20px',
                                        backgroundColor: '#4E4F50',
                                        borderRadius: '15px'

                                    }}
                                />
                            </div>
                            <div className='flex  justify-around w-[45%] ml-[-130px] hover:text-white'>
                                <Space direction="vertical" className='flex flex-row'>
                                    <Segmented options={options} style={{
                                        backgroundColor: '#1c1e21',
                                        color: 'white'
                                    }}
                                        onChange={handleSegmentedChange}
                                        className="hover:bg-blue-500 hover:text-white"
                                    />
                                    <Button disabled={moreLoaded} onClick={handleLoadOptions} style={{
                                        backgroundColor: '#1c1e21',
                                        color: 'white'
                                    }}
                                        className='hover:bg-blue-500 hover:text-white'
                                    >
                                        Load more options
                                    </Button>
                                </Space>
                            </div>
                            <div className='text-white flex flex-row justify-around w-[150px]'>
                                <div className='mr-[20px] mt-[-7px]'>
                                    <Space size={24}>
                                        <Badge >
                                            <Avatar shape="square" icon={<NodeCollapseOutlined />} />
                                        </Badge>
                                        <Badge count={1}>
                                            <button onClick={showModal_mess} >
                                                <Avatar shape="square" icon={<MessageOutlined />} />
                                            </button>
                                        </Badge>
                                    </Space>
                                </div>

                                <div>
                                    <button onClick={showModal}
                                    >
                                        <img src='https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/344541751_960805475115773_6521360510903368965_n.jpg?_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lBumZr8qRG0AX8ASO5e&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfAJ2jxuqm2oT2Ad6Ormdm7dztuW7-BfkEFQARcYRqMZxQ&oe=64C5095A'
                                            className='w-[40px] h-[40px] rounded-full mt-[3px]'
                                        />
                                    </button>
                                </div>

                                {/* xử lý khi nhấn vào message */}
                                <Modal open={isModalOpen_mess} onOk={handleOk_mess} onCancel={handleCancel_mess}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '60px',
                                        width: '100px'
                                    }}
                                    width={350}
                                >
                                    <div>
                                        <div>
                                            <div>
                                                <div className='text-[20px] mt-[20px] flex flex-row justify-between hover:bg-[#eeeeee]  h-[30px]'>
                                                    <div>
                                                        Chat
                                                    </div>
                                                    <div className='mt-[-3px] '>
                                                        <NotificationTwoTone />
                                                    </div>
                                                </div>
                                                <div className='text-[18px]'>
                                                    <div className='mt-[15px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex  items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <img src='https://scontent.xx.fbcdn.net/v/t1.15752-9/364546539_257212453762056_7830584812463434640_n.jpg?stp=dst-jpg_s206x206&_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=aee45a&_nc_ohc=DK4d1vek3lcAX9uTRvj&_nc_oc=AQmpRG8BcO_knJX7sU2QUXK330FkAKPn4TzMjt2BXj6IStpXtz1RiSZPhVhh6ff6zLatSu_Vw633_cxgNH6P67sO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRuLVf2zgauhC6Y14wlED8jJVjgzsDxdfmKyBLEcMDC0A&oe=64F6D923'
                                                                className='w-[45px] h-[45px] rounded-full mt-[5px] ml-[6px]'
                                                            />
                                                        </div>
                                                        <div >
                                                            <div>
                                                                Nhóm Siêu Nhân
                                                            </div>
                                                            <div className='text-[14px]'>
                                                                Hello
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-[15px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <img src='https://scontent.xx.fbcdn.net/v/t1.15752-9/364546539_257212453762056_7830584812463434640_n.jpg?stp=dst-jpg_s206x206&_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=aee45a&_nc_ohc=DK4d1vek3lcAX9uTRvj&_nc_oc=AQmpRG8BcO_knJX7sU2QUXK330FkAKPn4TzMjt2BXj6IStpXtz1RiSZPhVhh6ff6zLatSu_Vw633_cxgNH6P67sO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRuLVf2zgauhC6Y14wlED8jJVjgzsDxdfmKyBLEcMDC0A&oe=64F6D923'
                                                                className='w-[45px] h-[45px] rounded-full mt-[5px] ml-[6px]'
                                                            />
                                                        </div>
                                                        <div >
                                                            <div>
                                                                Gia đình
                                                            </div>
                                                            <div className='text-[14px]'>
                                                                Hello
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Màn hình và trợ năng

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Đóng góp ý kiến

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'
                                                        onClick={() => navigate('/login')}
                                                    >
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <LogoutOutlined />
                                                        </div>
                                                        <div>
                                                            Đăng xuất
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                                {/* xử lý khi nhấn vào avata */}
                                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '60px',
                                        width: '100px'
                                    }}
                                    width={350}
                                >
                                    <div>
                                        <div>
                                            <div className='flex flex-row border-b-2 border-gray-300 pb-[10px] hover:bg-[#eeeeee] mt-[20px]' >
                                                <button onClick={() => navigate('/ProfilePages')} className='flex flex-row mt-[5px] ml-[5px]'>
                                                    <div>
                                                        <img src='https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ'
                                                            className='w-[40px] h-[40px] rounded-lg mt-[5px]'
                                                        />
                                                    </div>
                                                    <div className='text-[18px] ml-[10px] mt-[10px] flex flex-column ' style={{
                                                        flexDirection: 'column'
                                                    }}>
                                                        <div>
                                                            Ngô Xuân Quy
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <div>
                                                <div className='text-[16px] mt-[10px] flex flex-row justify-between hover:bg-[#eeeeee]  h-[30px]'>
                                                    <div>
                                                        Xem trang cá nhân
                                                    </div>
                                                    <div className='mt-[-3px] '>
                                                        <NotificationTwoTone />
                                                    </div>
                                                </div>
                                                <div className='text-[18px]'>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex  items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <SettingOutlined />
                                                        </div>
                                                        <div >
                                                            Cài đặt và quyền riêng tư
                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Trợ giúp và Hỗ trợ

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Màn hình và trợ năng

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Đóng góp ý kiến

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'
                                                        onClick={() => navigate('/login')}
                                                    >
                                                        <div className='mt-[-8px] mr-[10px]'>
                                                            <LogoutOutlined />
                                                        </div>
                                                        <div>
                                                            Đăng xuất
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>

                            </div>
                        </div>
                    </div>

                    {/* Nội Dung */}

                    <div className=''>
                        <div>
                            <div className='flex justify-center '>
                                <div className='bg-black w-[75%] h-[400px] relative rounded-lg z-[-1]'>
                                    <div className='text-white text-[15px] absolute bottom-[10px] right-[20px]'>
                                        <div>
                                            Tạo avata
                                        </div>
                                        <div>
                                            Thêm Ảnh Bìa
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {apiusers?.map(apiuser => (
                                <div
                                    key={apiuser._id}
                                    className='w-full flex justify-around'>
                                    <div
                                        className=' mt-[-50px]  flex flex-row z-100'>
                                        <div >
                                            <img src='https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ'
                                                className='w-[200px] h-[200px] rounded-full z-100'
                                            />
                                        </div>
                                        <div className='mt-[70px] text-[26px] ml-[10px]'>
                                            <div>
                                                {apiuser.name}
                                            </div>
                                            <div className='text-[16px]'>
                                                2k Bạn Bè
                                            </div>
                                            <div>
                                                <Avatar.Group
                                                    maxCount={2}
                                                    size="large"
                                                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                                                >
                                                    <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
                                                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>

                                                    <Tooltip title="Ant User" placement="top">
                                                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                                    </Tooltip>
                                                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                                                    <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                                                </Avatar.Group>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-[15px] flex flex-row items-center'>
                                        {apiFriend?.length === 0 && checkfriend?.length === 0 && (
                                            <div className='bg-[#3982E4] h-[40px] w-[140px] ml-[-100px] rounded-lg'>
                                                <div className='ml-[10px] text-white flex flex-row'>
                                                    <div className='mt-[-4px]'>
                                                        <PlusOutlined />
                                                    </div>
                                                    <button onClick={() => handerAddFriend(apiuser._id)}>
                                                        <div className='ml-[7px] bg-red'>
                                                            Thêm Bạn Bè
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {apiFriend?.length !== 0 && checkfriend?.length === 0 && apiFriend[0]?.status === false && (
                                            <div className='bg-[#CC0000] h-[40px] w-[140px] ml-[-100px] rounded-lg'>
                                                <div className='ml-[10px] text-white flex flex-row'>
                                                    <div className='mt-[-4px]'>
                                                        <PlusOutlined />
                                                    </div>
                                                    <button onClick={() => handerDeleteFriend(apiuser._id)}>
                                                        <div className='ml-[7px] bg-red'>
                                                            Xóa Yêu Cầu
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {apiFriend?.length === 0 && checkfriend?.length !== 0 && checkfriend[0]?.status === false && (
                                            <div className=' h-[40px] w-[190px] ml-[-100px] rounded-lg'>
                                                <div className='ml-[10px] text-white flex flex-row'>
                                                    <div className='mt-[-4px]'>
                                                        <PlusOutlined />
                                                    </div>
                                                    <button onClick={() => handerDeleteFriend(apiuser._id)}>
                                                        <Popover content={() => content(apiuser._id)} title="Title">
                                                            <Button>
                                                                <div className='ml-[7px] '>
                                                                    Xác Nhận lời kết bạn
                                                                </div>
                                                            </Button>
                                                        </Popover>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {((apiFriend?.length !== 0 && apiFriend[0]?.status === true) || (checkfriend.length !== 0 && checkfriend[0]?.status === true)) && (
                                            <div className='bg-[#eeeee] h-[40px] w-[190px] ml-[-100px] rounded-lg'>
                                                <div className='ml-[10px] text-white flex flex-row'>
                                                    <div className='mt-[-4px]'>
                                                        <PlusOutlined />
                                                    </div>
                                                    <button onClick={() => handerDeleteFriend(apiuser._id)}>
                                                        <Popover content={() => content_huyKB(apiuser._id)} title="Title">
                                                            <Button>
                                                                <div className='ml-[7px] text-black '>
                                                                    Bạn Bè
                                                                </div>
                                                            </Button>
                                                        </Popover>
                                                    </button>
                                                </div>
                                            </div>
                                        )}


                                        <div className='ml-[15px] bg-[#3982E4] h-[40px] w-[80px]  rounded-lg'>
                                            <div className='text-white ml-[10px]'>
                                                Nhắn Tin
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-row justify-center mt-[20px]'>
                        <div>
                            <StoryProfile />
                        </div>
                        <div className='w-[600px]'>
                            <PostsProFile apis={apis} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfilePages