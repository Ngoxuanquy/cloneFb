import React, { useEffect, useState } from 'react'
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
import { Segmented, Button, Space, Avatar, Upload } from 'antd';
import { Badge, Modal, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Divider, Tooltip } from 'antd';
import PostsProFile from '../../../Components/PostsProFile/PostsProFile';
import StoryProfile from '../../../Components/StoryProfile/StoryProfile';
import axios from 'axios'

function ProfilePages() {

    const [options, setOptions] = useState(['Home', 'Video', 'Monthly']);
    const [moreLoaded, setMoreLoaded] = useState(false);
    const navigate = useNavigate();
    //xử lý sự kiện nhấn nút đăng ký
    const URL = process.env.REACT_APP_URL;
    const [fileList, setFileList] = useState([]);


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


    const [loading, setLoading] = useState(false);

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

    //baatj tawts modal add avata
    const [isModalOpenAvata, setIsModalOpenAvata] = useState(false);

    const showModalAvata = () => {
        setIsModalOpenAvata(true);
    };



    const handleCancelAvata = () => {
        setIsModalOpenAvata(false);
    };



    //lấy apis của tất cả bài đăng
    const [users, setUser] = useState([])
    const apiUser = () => {
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
        fetch(URL + '/user/getNameById/' + cleanId, requestOptions)
            .then((data) => {
                return data.json()

            })
            .then((data) => {
                console.log({ data })
                setUser(data.metadata)
            })
    }

    useEffect(() => {
        apiUser()
    }, [])

    const [apis, setApi] = useState([])

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
        fetch(URL + '/getAllById?user_id=' + cleanId, requestOptions)
            .then((data) => {
                return data.json()

            })
            .then((data) => {
                setApi(data.metadata)
            })
    }, [])


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

        formData.append('file', fileList[0]?.thumbUrl)

        // formData.append('file', file?.thumbUrl)
        const res = await axios.post(api, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })

        return res.data.secure_url

    }

    //xử lý thêm vào avata 
    const handerSetAvata = () => {
        setIsModalOpenAvata(true)


    }

    const handleOkAvata = async () => {
        setLoading(true)
        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const name = Cookies.get('name');

        const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : "";
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        const cleanName = name ? name.replace(/^"|"$/g, '') : "";

        const img = await uploadImage();

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_KEY,
                "x-client-id": cleanId,
                "authorization": cleanedJwtString
            },
            body: JSON.stringify({
                user_id: cleanId,
                img: img
            })

        };

        // tạo thêm bài viết
        fetch(URL + '/user/addImg', requestOptions)
            .then((data) => {
                setIsModalOpenAvata(false)
                apiUser()
                setLoading(false)

            })
    }

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const handleCancel1 = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    console.log({ users })

    return (
        <div>
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
                                <button onClick={() => navigate("/")}>

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
                                                            <img src='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg'
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


                    {/* Madel add avata */}
                    <Modal open={isModalOpenAvata} onOk={handleOkAvata} onCancel={handleCancelAvata}>
                        <div style={{ width: "500px", height: "500px", textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ marginBottom: '20px', fontSize: "30px", textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                Up ảnh
                            </div>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}

                            >
                                {fileList?.length > 0 ? null : uploadButton}
                            </Upload>
                        </div>
                    </Modal>
                    {/* Nội Dung */}

                    <div className='bg-[#dddddd] z-[-2]'>
                        <div>
                            <div className='flex justify-center '>
                                <div className='bg-black w-[75%] h-[400px] relative rounded-lg z-[1]'>
                                    <div className='text-white text-[15px] absolute bottom-[10px] right-[20px]'>
                                        <button onClick={() => handerSetAvata()}>
                                            <div>
                                                Tạo avata
                                            </div>
                                        </button>
                                        <div>
                                            Thêm Ảnh Bìa
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex justify-around '>
                                <div className=' mt-[-50px]  flex flex-row z-100'>
                                    <div className='z-[3]' >
                                        {users.img ?
                                            <img src={users.img}
                                                className='w-[200px] h-[200px] rounded-full z-100'
                                            />
                                            :
                                            <img src='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg'
                                                className='w-[200px] h-[200px] rounded-full z-100'
                                            />
                                        }
                                    </div>
                                    <div className='mt-[70px] text-[26px] ml-[10px]'>
                                        <div>
                                            {names}
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
                                    <div className='bg-[#3982E4] h-[40px] w-[140px] ml-[-100px] rounded-lg'>
                                        <div className='ml-[10px] text-white flex flex-row'>
                                            <div className='mt-[-4px]'>
                                                <PlusOutlined />
                                            </div>
                                            <div className='ml-[7px]'>
                                                Thêm Vào Tin
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ml-[15px] bg-[#3982E4] h-[40px] w-[180px]  rounded-lg'>
                                        <div className='text-white ml-[10px]'>
                                            Chỉnh sửa trang cá nhân
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-row justify-around mt-[20px] items-center'>
                                <div className='text-[18px] flex flex-row w-[400px] items-center justify-around '>
                                    <div>
                                        Bài viết
                                    </div>
                                    <div>
                                        Giới thiệu
                                    </div>
                                    <div>
                                        Ban bè
                                    </div>
                                    <div>
                                        Ảnh
                                    </div>
                                    <div>
                                        Video
                                    </div>
                                    <div>
                                        Check in
                                    </div>
                                </div>

                                <div>
                                    ...
                                </div>
                            </div>
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