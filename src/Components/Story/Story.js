import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';
import {
    PlusCircleOutlined,
    PlusCircleTwoTone,
    PlusOutlined
} from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios'
import { Alert, Spin, Switch } from 'antd';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';
import Stories from 'react-insta-stories';
import './Story.css'

function Index({ images, storys }) {

    //khai báo modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const URL = process.env.REACT_APP_URL;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //khai báo slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([])

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

        formData.append('file', fileList[0]?.thumbUrl)

        // formData.append('file', file?.thumbUrl)
        const res = await axios.post(api, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })

        return res.data.secure_url


        // return url;
        // return res.data.secure_url;
    }


    const handleOk = async () => {
        setIsModalOpen(false);

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
                user_name: cleanName,
                user_img: "a",
                imgs: img
            })
        };

        // tạo thêm bài viết
        fetch(URL + '/story/addStory', requestOptions)
            .then((data) => {

                return data.json()
            })
            .then((data) => {
                setLoading(false)

            })
    }

    const image = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];


    //khai baos story
    const [stories, setStories] = useState([])

    //xử lý bật modal khi nhấn vào story
    const [apiImages, setApImage] = useState([])
    const [imgs, setImages] = useState([])
    const [isModalOpenStory, setIsModalOpenStory] = useState(false);

    const showModalStory = (index) => {
        if (index === undefined || !storys[index]) {
            return alert("Tin này k tồn tại!!")
        }


        const currentStory = storys[index];
        // if (!currentStory || !currentStory.content) {
        //     return alert("Tin này không tồn tại hoặc không có nội dung!!");
        // }

        const images = currentStory?.imgs.map((url) => ({
            original: url,
            thumbnail: url,
        }));

        const stories = currentStory?.imgs.map((apiImage) => ({
            url: apiImage,
            duration: 5000,
            header: {
                heading: currentStory.user_name,
                subheading: currentStory.createdAt,
                profileImage: currentStory.user_img,
            },
        }));

        setApImage(images);
        setStories(stories);
        setIsModalOpenStory(true);
    };



    const handleCancelStory = () => {
        setIsModalOpenStory(false);
    };
    const handleOkStory = () => {
        setIsModalOpenStory(false);
    };

    const [userImg, setUserImg] = useState([])

    useEffect(() => {
        const img = Cookies.get('img');
        const cleanImg = img ? img.replace(/^"|"$/g, '') : "";

        setUserImg(cleanImg)
    }, [])


    return (

        <div className="bg-no-repeat ">


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

            <Slider {...settings} className='flex flex-row'>

                <button onClick={showModal}>
                    <div className='mt-[3px] bg-[#eeeeee] h-[200px] shadow-red-500 hover:scale-105'>
                        {userImg ?
                            <img src={userImg}
                                className='w-[280px] h-[160px] rounded-lg  '
                            />
                            :
                            <img src='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg'
                                className='w-[280px] h-[170px] rounded-lg mb-[-9px] '
                            />
                        }
                        <div className='items-center flex justify-center mt-[-20px] flex-column '>
                            <PlusCircleTwoTone className='text-[35px]' />
                            <div className='text-[15px]'>
                                Tạo tin
                            </div>
                        </div>
                    </div>
                </button>
                {/* <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}> */}
                {/* 
                <ImageGallery
                    items={image}
                    showPlayButton={false}
                    showFullscreenButton={false}
                /> */}
                {/* </Modal> */}
                {storys?.map((image, index) => (
                    <button onClick={() => showModalStory(index)}>
                        <div key={image.id} className="w-[150px] h-[200px] p-1">
                            <div>
                                <div className='absolute z-1 '>
                                    {image?.user_img ?
                                        <img src='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg'
                                            className='w-[40px] h-[40px] rounded-full'
                                        />
                                        :
                                        <img src={image?.user_img} />
                                    }
                                </div>
                                <div className='text-[12px] absolute z-2 bottom-0 text-white'>
                                    {image?.user_name}
                                </div>
                                <div key={image.id} className="w-[150px] h-[200px] p-1">
                                    <img
                                        src={image?.imgs[0]}
                                        alt={`Image ${image.id}`}
                                        width={"100%"}
                                        height={200}
                                        className="w-[100%] h-[100%] bg-no-repeat mr-[10px] rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </button>
                ))
                }

                {
                    images?.map((image) => (
                        <div key={image.id} className="w-[150px] h-[200px] p-1">
                            <Image
                                src={image.imgage}
                                alt={`Image ${image.id}`}
                                width={120}
                                height={200}
                                className="w-[100%] h-[100%] bg-no-repeat mr-[10px] rounded-lg"
                            />
                        </div>
                    ))
                }
            </Slider >

            <Modal title="Đăng tin" open={isModalOpenStory} onOk={handleOkStory} onCancel={handleCancelStory}
                className='w-[100px] h-full mt-[-60px]'
            >
                <div className=''>
                    <div>
                        <div>
                            <div>
                                <div className='flex flex-row'>
                                    <div>
                                        {apiImages?.user_img ?
                                            <img src='https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg'
                                                className='w-[40px] h-[40px] rounded-full'
                                            />
                                            :
                                            <img src={apiImages?.user_img} />
                                        }
                                    </div>
                                    <div className='mt-[6px] ml-[10px]'>
                                        {apiImages.user_name}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {stories?.length > 0 ? (
                                            <Stories
                                                stories={stories}
                                                defaultInterval={1500}
                                                width={432}
                                                height={500}
                                                onAllStoriesEnd={() => console.log('All stories ended')}
                                                onStoryEnd={() => setIsModalOpenStory(false)}
                                                onStoryStart={(storyId, currentStoryIndex) =>
                                                    console.log(`Story with ID ${storyId} started at index ${currentStoryIndex}`)
                                                }
                                                storyContentStyles={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                className="img:w-[500px]"
                                            >

                                            </Stories>

                                        ) : (
                                            <p>No stories to display.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>


            <Modal title="Đăng tin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <div >
                    <div className='flex flex-row justify-center items-center h-[500px]'>
                        <div className="mx-4">
                            <Button className='h-[300px] w-[300px] bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white'>
                                <div className='text-[18px] text-white'>
                                    Đăng story bằng ảnh
                                </div>
                                <div className='mt-[30px]'>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        className='w-[70px] h-[70px]'
                                    >
                                        {fileList?.length > 0 ? null : uploadButton}
                                    </Upload>

                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel1}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </Button>
                        </div>
                        {/* <div className="mx-4">
                            <Button className='h-[200px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                                <div className='text-[18px]'>
                                    Đăng story bằng chữ
                                </div>
                                <div className='mt-[30px]'>
                                    <PlusCircleTwoTone className='text-[35px]' />
                                </div>
                            </Button>
                        </div> */}
                    </div>
                </div>
            </Modal >
        </div >
    );
}

export default Index;
