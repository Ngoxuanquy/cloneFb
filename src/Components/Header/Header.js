
import React, { useEffect, useReducer, useState } from 'react';

// import { Contairner_Left } from '../../../Components'
// import './DefaultLayout.css'
import {
    NodeCollapseOutlined,
    MessageOutlined,
    SettingOutlined,
    HeatMapOutlined,
    LogoutOutlined,
    NotificationTwoTone,
    CloseOutlined
} from '@ant-design/icons';
import { Segmented, Button, Space } from 'antd';
import { Avatar, Badge, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Spin, Switch } from 'antd';
// import Loading from '../../../Components/Loading/Loading'
import Cookies from 'js-cookie';

const Header = () => {
    const [options, setOptions] = useState(['Home', 'Video', 'Monthly']);
    const [moreLoaded, setMoreLoaded] = useState(false);
    const navigate = useNavigate();
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

    //set key
    const [seachKey, setseachKey] = useState('')
    const [seachApis, setseachApi] = useState([])

    const [loading, setLoading] = useState(true);
    const [Name, setNames] = useState(true);

    useEffect(() => {
        const name = Cookies.get('name');
        const cleanName = name ? name.replace(/^"|"$/g, '') : "";
        setNames(cleanName)

    }, [])

    //apis timf kieems
    const seachApi = () => {
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
        fetch(URL + '/user/getUserName/' + seachKey, requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setseachApi(data.metadata)
            })

    }

    useEffect(() => {
        if (seachKey) {
            seachApi()
            return;
        }

    }, [seachKey])

    //Khia báo modal để mở search
    const [isModalOpen_search, setIsModalOpenSearch] = useState(false);

    const showModal_search = () => {
        setIsModalOpenSearch(true);
    };

    const handleOk_search = () => {
        setIsModalOpenSearch(false);
    };

    const handleCancel_search = () => {
        setIsModalOpenSearch(false);
    };


    const handleSegmentedChange = (value) => {
        navigate(`/${value}`);
    };

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
                console.log({ data })
                const filteredData = data?.metadata?.filter((user) => user?._id !== cleanId);
                setApiUsers(filteredData)
            })
    }, [])


    return (
        // <Spin spinning={loading} delay={500} className='z-100 w-[90%] flex justify-center items-center h-screen '>
        <div className="mb-0 w-full" >
            <div className="text-3xl text-black flex flex-row w-full">

                <div className='bg-[#eeeeee] w-full h-[60px] text-balck bg-[#1c1e21] ' style={{
                    backgroundColor: '#001529',
                    borderBottom: '2px solid gray',
                    borderTop: '2px solid gray',
                    zIndex: 1

                }}>
                    <div className=' mt-[7px] '>
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
                                    onChange={(e) => setseachKey(e.target.value)}
                                />
                            </div>
                            <div className='flex  justify-around w-[45%] ml-[-130px] hover:text-white'>
                                <Space direction="vertical" className='flex flex-row'>
                                    <Segmented options={options} style={{
                                        backgroundColor: '#1c1e21',
                                        color: 'white'
                                    }}

                                        className="hover:bg-blue-500 hover:text-white"
                                        onChange={handleSegmentedChange}
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
                            <div className='text-white flex flex-row justify-around w-[190px] '>
                                <div className=' mt-[-7px]'>
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
                                {/* //modal */}
                                {!seachKey ? null :
                                    <div className='bg-[#18191A] w-[350px] h-auto absolute z-1000 left-0 top-[60px] rounded-b-xl'>
                                        <div>
                                            {
                                                seachApis ?
                                                    seachApis?.map(seachApi => (
                                                        <div className='hover:bg-[#777777]'>
                                                            <div className='flex flex-row justify-between p-[10px] mt-[7px]'>
                                                                <div className='flex flex-row'>
                                                                    <button className='flex flex-row' onClick={() => navigate('/Friend/' + seachApi._id)}>
                                                                        <div>
                                                                            <img src='https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/363872342_1415144519349431_4371787362668429238_n.jpg?_nc_cat=103&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_ohc=V7pVHEIAJCEAX9H8nbT&_nc_ht=scontent.fhan14-3.fna&oh=03_AdS0EQHbGjGVPrlTrZDP92tP816Oxm3Cjx93q5-IMMzZXw&oe=64EDBEAE'
                                                                                className='w-[40px] h-[40px] rounded-lg'
                                                                            />
                                                                        </div>
                                                                        <div className='text-[15px] ml-[7px]'>
                                                                            {seachApi.name}
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                                <div className='mt-[-10px]'>
                                                                    <CloseOutlined className='text-[10px] ' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                    :
                                                    <div>
                                                        Không Tồn tại tên này
                                                    </div>

                                            }
                                        </div>
                                    </div>
                                }
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
                                                    <div className='mt-[15px] h-[auto] flex flex-column  rounded-lg'>
                                                        {apiUses.map(apiUse => (
                                                            <div className='flex flex-row  hover:bg-[#eeeeee] p-[7px] mt-[10px] ml-[-7px] items-center'
                                                                onClick={() => navigate('/Messages')}
                                                            >
                                                                <div className='mt-[-8px] '>
                                                                    <img src='https://scontent.xx.fbcdn.net/v/t1.15752-9/364546539_257212453762056_7830584812463434640_n.jpg?stp=dst-jpg_s206x206&_nc_cat=108&cb=99be929b-3346023f&ccb=1-7&_nc_sid=aee45a&_nc_ohc=DK4d1vek3lcAX9uTRvj&_nc_oc=AQmpRG8BcO_knJX7sU2QUXK330FkAKPn4TzMjt2BXj6IStpXtz1RiSZPhVhh6ff6zLatSu_Vw633_cxgNH6P67sO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRuLVf2zgauhC6Y14wlED8jJVjgzsDxdfmKyBLEcMDC0A&oe=64F6D923'
                                                                        className='w-[45px] h-[45px] rounded-full mt-[5px] ml-[6px]'
                                                                    />
                                                                </div>
                                                                <div >
                                                                    <div>
                                                                        {apiUse.name}
                                                                    </div>
                                                                    <div className='text-[14px]'>
                                                                        Hello
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
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
                                                            {Name}
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
                                                        <div className='mt-[-8px] '>
                                                            <SettingOutlined />
                                                        </div>
                                                        <div >
                                                            Cài đặt và quyền riêng tư
                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] '>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Trợ giúp và Hỗ trợ

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] '>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Màn hình và trợ năng

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'>
                                                        <div className='mt-[-8px] '>
                                                            <HeatMapOutlined />
                                                        </div>
                                                        <div>
                                                            Đóng góp ý kiến

                                                        </div>
                                                    </div>
                                                    <div className='mt-[10px] hover:bg-[#eeeeee] h-[50px] p-[10px] flex items-center rounded-lg'
                                                        onClick={() => navigate('/login')}
                                                    >
                                                        <div className='mt-[-8px] '>
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

                </div>
            </div>

        </div >
        // </Spin>
    )
}

export default Header