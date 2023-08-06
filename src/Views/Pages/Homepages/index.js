import React, { useState, useEffect, useRef } from 'react'
import "slick-carousel/slick/slick.css";
import Slider from 'react-slick';
import { Story } from '../../../Components';
import './index.css'
import { Image, Space } from 'antd';
import { Button, Popover, Modal, Input, Badge, Upload } from 'antd';
import Post from './../../../Components/Posts/Post';
import Cookies from 'js-cookie';
import { EllipsisOutlined } from '@ant-design/icons';
import { Divider, Tour, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Alert, Spin, Switch, FloatButton, notification, App } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    AppstoreOutlined,
    CalendarOutlined,
    NodeCollapseOutlined,
    PlayCircleTwoTone,
    HomeFilled,
    PercentageOutlined,
    LikeFilled
} from '@ant-design/icons';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../../Components/Notification/index'
import { io } from "socket.io-client";

function Index() {

    const URL = process.env.REACT_APP_URL;
    const navigate = useNavigate();

    //khai báo update
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    //loading
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!Cookies.get('accessToken')) {
            navigate("/login");
        } else {
        }
    }, []);

    const images = [
        { id: 1, imgage: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/720x1480-Wallpapers.jpg' },
        { id: 2, imgage: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/720x1480-Wallpapers.jpg' },
        { id: 3, imgage: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/720x1480-Wallpapers.jpg' },
        { id: 4, imgage: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/720x1480-Wallpapers.jpg' },
        { id: 5, imgage: 'https://tophinhanhdep.com/wp-content/uploads/2021/10/720x1480-Wallpapers.jpg' },
        { id: 6, imgage: 'https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg' },
    ]

    //khai báo value lấy từ cookie
    const [names, setName] = useState()

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const name = Cookies.get('name');

        const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        const cleanName = name ? name.replace(/^"|"$/g, '') : "";

        setName(cleanName)

    }, [])


    //Khia báo modal để đăng bài viết
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //khai báo đăng bài 
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const [open, setOpen] = useState(false);

    const steps = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
        },
    ];

    const [fileList, setFileList] = useState([]);

    // Hàm xử lý khi người dùng chọn tệp
    const handleFileChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        // Lưu trữ danh sách các tệp đã tải lên vào state
        setFileList(info.fileList);
    };

    // Hàm trả về giá trị từ Upload
    const getValueFromEvent = (info) => {
        if (Array.isArray(info)) {
            return info;
        }
        return info && info.fileList;
    };


    //đổi link ảnh
    const [uploadedImage, setUploadedImage] = useState(null);

    const uploadImage = async () => {
        // setIsLoading(true)

        const CLOUD_NAME = "dvqmndx5j";
        const PRESET_NAME = "fb-clone";
        const FOLDER_NAME = "post"
        const url = [];
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

        const formData = new FormData();
        formData.append("upload_preset", PRESET_NAME)
        formData.append("folder", FOLDER_NAME)

        fileList.map(img => {
            formData.append('file', img?.thumbUrl)
        })

        for (const file of fileList) {
            formData.append('file', file?.thumbUrl)
            const res = await axios.post(api, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })

            url.push(res.data.secure_url)

        }

        return url;
        // return res.data.secure_url;
    }

    const [imgs, setImg] = useState([])

    //khai báo conten 
    const [contens, setConten] = useState('')

    //xử lý khi đăng bài

    const handleOk = async () => {
        setLoading(true);

        setIsModalOpen(false);
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const name = Cookies.get('name');

        const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        const cleanName = name ? name.replace(/^"|"$/g, '') : "";


        const img = await uploadImage()
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_KEY,
                "x-client-id": cleanId,
                "authorization": cleanedJwtString
            },
            body: JSON.stringify({
                name: cleanName,
                user_id: cleanId,
                content: contens,
                imgs: img
            },)
        };

        // tạo thêm bài viết
        fetch(URL + '/createPost', requestOptions)
            .then((data) => {
                setLoading(false);
                window.location.reload();
                return data.json()

            })

    };

    //Socket.io
    const socket = useRef();
    // const [socket, setSocket] = useState(null);

    // useEffect(() => {
    //     setSocket(io("http://localhost:5000"));
    // }, []);

    useEffect(() => {
        const id = Cookies.get('id');
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        socket.current = io("http://localhost:3056");
        socket.current.emit("add-user", cleanId);
    }, []);


    //create nofitication
    const createNofitication = (data) => {
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
                to_name: data.toName,
                to_id: cleanId,
                user_id: data.toID,
                type: data.type,
                // user: cleanName,
                post_id: data.senderName
            },)
        };

        // tạo thêm bài viết
        fetch(URL + '/nofitication/addNofiticatiion', requestOptions)

    }

    // console.log({ socket })

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.current.on("getNotification", (data) => {
            console.log({ data })
            createNofitication(data)
            showNotification(data)
            setNotifications((prev) => [...prev, data]);
        });
    }, [socket]);


    const showNotification = (notifications) => {
        notification.info({
            message: `Notification`,
            description: (
                <button>
                    {notifications?.toName}
                    <br />
                    {notifications?.type}
                </button>
            ),
            onClick: () => {
                if (notifications?.type == "thả cảm xúc" || notifications?.type == "Bình luận") {
                    navigate('/Nofitication_Post/' + notifications.senderName)
                }
                if (notifications?.type == "Kết Bạn") {
                    navigate('/Friend/' + notifications.senderName)

                }
                else {
                    navigate("/Chat/" + notifications.fromID);
                }
            },
        });
    };

    console.log({ notifications })
    //xử lý story
    const [storysAll, setStoryAll] = useState([])
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
        fetch(URL + '/story/getStory', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                setStoryAll(data.metadata)
            })
    }, [])

    const [apis, setApi] = useState([]);
    const [userId, setUserId] = useState([]);

    const [storyFriend, setStoryFriend] = useState([])

    useEffect(() => {

        setLoading(true)
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const name = Cookies.get('name');

        const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : '';
        const cleanId = id ? id.replace(/^"|"$/g, '') : '';
        const cleanName = name ? name.replace(/^"|"$/g, '') : '';

        setUserId(cleanId)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_KEY,
                'x-client-id': cleanId,
                authorization: cleanedJwtString
            }
        };

        // Fetch data from the API
        fetch(URL + '/friends/getAllPostById/' + cleanId, requestOptions)
            .then((data) => data.json())
            .then((data) =>
            // Lọc các giá trị trùng nhau giữa hai mảng
            {
                // setApiFriend(apis?.filter(item => data.metadata.includes(item.user_id)))
                const body = storysAll?.filter(item => data.metadata?.includes(item.user_id));
                setStoryFriend(body)
                setLoading(false)
            }
            )
    }, [storysAll])




    return (

        <div className="mt-10 text-black "  >
            {/* <Notification /> */}

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
            <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{ right: 24 }}
                icon={<CustomerServiceOutlined />}
            >
                <FloatButton />
                <FloatButton icon={<CommentOutlined />} />
            </FloatButton.Group>
            <div className='flex flex-row justify-around '>
                <div style={{
                    overflowY: 'scroll',
                    position: 'fixed',
                    height: '100vh',
                    overflowY: "auto",

                }}
                    className="scroll-container"
                >
                    <div className='w-[650px] items-center justify-center bg-gray rounded-lg border border-gray-300 p-[10px]' >
                        {/* <div className='flex flex-row w-[400px] justify-around items-center w-full mb-[10px] text-xl'>
                                <div>
                                    Tin
                                </div>
                                <div>
                                    Reels
                                </div>
                                <div>
                                    Phòng họp mặt
                                </div>
                            </div> */}

                        <div className='rounded-lg items-center justify-center ml-[10px]'>

                            <Story images={images} storys={storyFriend} />
                        </div>
                    </div>


                    {/* Đăng bài viết */}
                    <div className='mt-10 border border-gray-300 rounded-lg p-[10px] '>
                        <div className='flex flex-row items-center justify-center'>
                            <img src='https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ'
                                className='w-[40px] h-[40px] rounded-lg mt-[5px]'
                            />
                            <div>
                                <input
                                    type="text" // Change the type based on the input you want (text, number, email, etc.)
                                    className="border rounded p-2"
                                    placeholder={names + " ơi, Bạn đang nghĩ gì........."}
                                    style={{
                                        height: '40px',
                                        fontSize: "16px",
                                        width: '500px',
                                        marginTop: '-20px',
                                        marginLeft: '20px'

                                    }}
                                    onClick={showModal}
                                />

                            </div>
                        </div>

                        <Modal title="Tạo bài viết" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // fontSize: '20px',
                            // width: '300px'
                            color: 'black'
                        }}>
                            <div style={{
                                borderTop: '0.5px solid gray',
                                color: 'black'
                            }}>
                                <div>
                                    <div className='flex flex-row'>
                                        <div>
                                            <img src='https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ'
                                                className='w-[40px] h-[40px] rounded-lg mt-[5px]'
                                            />
                                        </div>
                                        <div className='text-[18px] ml-[10px] mt-[10px] flex flex-column ' style={{
                                            flexDirection: 'column'
                                        }}>
                                            <div>
                                                {names}
                                            </div>

                                        </div>
                                    </div>
                                    <div className='mt-[10px] '>
                                        <div ref={ref2}>
                                            <Input width={100} height={300} style={{
                                                border: 'none',
                                                height: '100px',
                                                maxWidth: '100%',
                                                fontSize: '25px'
                                            }}
                                                placeholder='Bạn đang nghĩ gì vậy ....!!'
                                                onChange={(e) => setConten(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <div className='w-[100%] flex flex-row justify-around'>
                                                <div >
                                                    Thêm vào bài viết của bạn
                                                </div>
                                                <div className='ml-[100px]'>
                                                    <Button type="primary" onClick={() => setOpen(true)} style={{
                                                        backgroundColor: 'white',
                                                        color: 'black'
                                                    }}>
                                                        Hướng dẫn
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>

                                                <Divider />
                                                <Space>
                                                    <Upload
                                                        beforeUpload={getValueFromEvent} // Sử dụng hàm getValueFromEvent
                                                        onChange={handleFileChange} // Xử lý sự kiện khi người dùng chọn tệp
                                                        listType="picture-card" // Hiển thị hình ảnh nhỏ
                                                        fileList={fileList} // Truyền danh sách các tệp đã tải lên vào Upload
                                                    >
                                                        <Button ref={ref1} icon={<UploadOutlined />}>Click to Upload</Button>
                                                    </Upload>


                                                    {/* <Button type="primary" className='text-[black]'>
                                                        Save
                                                    </Button>
                                                    <Button ref={ref3} icon={<EllipsisOutlined />} /> */}
                                                </Space>
                                                <Tour
                                                    open={open}
                                                    onClose={() => setOpen(false)}
                                                    steps={steps}
                                                    indicatorsRender={(current, total) => (
                                                        <span className='text-[black]'>
                                                            {current + 1} / {total}
                                                        </span>
                                                    )}
                                                    className='text-[black]'
                                                    style={{
                                                        color: 'black'
                                                    }}
                                                />

                                                {/* <button onClick={handerSubmit}>
                                                    Đăng bài
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>

                        <div className='text-[18px] flex flex-row justify-around mt-[10px]'>
                            <div>
                                Video trực tiếp
                            </div>
                            <div>
                                Ảnh/Video
                            </div>
                            <div>
                                Cảm xác/Hoạt động
                            </div>
                        </div>
                    </div>

                    {/* //Đăng ảnh */}
                    <div className='mb-[160px]'>
                        <Post className='mt-[20px]' socket={socket} />
                    </div>


                </div>
            </div>
        </ div >


    )
}

export default Index