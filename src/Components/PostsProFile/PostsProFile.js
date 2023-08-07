import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'antd';
import { Button, Popover } from 'antd';
import {
    AppstoreOutlined,
    CalendarOutlined,
    NodeCollapseOutlined,
    PlayCircleTwoTone,
    HomeFilled,
    PercentageOutlined,
    LikeFilled,
    DashOutlined
} from '@ant-design/icons';
import Cookies from 'js-cookie';
import { io } from "socket.io-client";

function PostsProFile({ apis }) {
    const URL = process.env.REACT_APP_URL;
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [userId, setUserId] = useState([]);


    const content = (post_id) => {
        return (
            <div className='text-3xl'>
                <span className='w-[30px] hover:text-[35px] hover:bg-gray-100 m-[10px]' onClick={() => handleEmojiClick('👍 Like', post_id)}>
                    👍
                </span>
                <span className='w-[30px] hover:text-[35px] hover:bg-gray-100 m-[10px]' onClick={() => handleEmojiClick('❤️ Yêu Thích', post_id)}>
                    ❤️
                </span>
                <span className='w-[30px] hover:text-[35px] hover:bg-gray-100 m-[10px]' onClick={() => handleEmojiClick('🤣 HaHa', post_id)}>
                    🤣
                </span>
                <span className='w-[30px] hover:text-[35px] hover:bg-gray-100 m-[10px]' onClick={() => handleEmojiClick('😍 Yêu Thích', post_id)}>
                    😍
                </span>
                <span className='w-[30px] hover:text-[35px] hover:bg-gray-100 m-[10px]' onClick={() => handleEmojiClick('😒 Trầm Cảm', post_id)}>
                    😒
                </span>
            </div>
        )
    };

    //Socket.io
    const socket = useRef();

    useEffect(() => {
        const id = Cookies.get('id');
        const cleanId = id ? id.replace(/^"|"$/g, '') : "";
        socket.current = io("http://localhost:3056");
        socket.current.emit("add-user", cleanId);
    }, []);


    //xét lại cảm xúc
    const [camxuc, setCamxuc] = useState('')


    const handleEmojiClick = (value, post_id, user_id) => {

        setCamxuc(value)


        const token = Cookies.get('accessToken');
        const id = Cookies.get('id');
        const name = Cookies.get('name');

        const cleanedJwtString = token ? token.replace(/^"|"$/g, '') : '';
        const cleanId = id ? id.replace(/^"|"$/g, '') : '';
        const cleanName = name ? name.replace(/^"|"$/g, '') : '';



        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.REACT_APP_KEY,
                'x-client-id': cleanId,
                'authorization': cleanedJwtString
            },
            body: JSON.stringify({
                user_id: cleanId,
                user_post: post_id,
                feeling_value: value,
                to_name: cleanName
            },)
        };

        // Fetch data from the API
        fetch(URL + '/postHaha', requestOptions)
            // .then(() => getApiAllPost())
            .then(() => {
                //Thống Báo
                // type === 1 && setLiked(true);
                socket.current.emit("sendNotification", {
                    senderName: post_id,
                    receiverName: cleanId,
                    type: "thả cảm xúc",
                    toID: user_id,
                    toName: cleanName
                });
            })
    }

    //Xuwr lý loading
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
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
                const body = apis?.filter(item => data.metadata?.includes(item.user_id));

                setData(body);
                setLoading(false);

            }
            )
            .catch(() => {
                setLoading(false);
            });
    };


    useEffect(() => {
        loadMoreData();
    }, [apis]);

    //xử lý nhập bình luận
    const [textComment, setTextComment] = useState()
    const onChange = (e) => {
        setTextComment(e.target.value)
    }

    //xử lý khi nhấn vình luận
    const handerComment = (postId, user_id, UserName) => {
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
                'authorization': cleanedJwtString
            },
            body: JSON.stringify({
                to_name: UserName,
                to_id: user_id,
                user_id: cleanId,
                post_id: postId,
                content: textComment,
                from_name: cleanName,
                date: new Date()
            })
        };

        // Fetch data from the API
        fetch(URL + '/createComment', requestOptions)
            .then(() => {
                // getApiAllPost()
                setTextComment("");
                socket.current.emit("sendNotification", {
                    senderName: postId,
                    receiverName: cleanId,
                    type: "Bình luận",
                    toID: user_id,
                    toName: cleanName
                });
            })
    }

    //Xử lý khi xóa comment
    const handerDeleteComment = (payload) => {
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
                'authorization': cleanedJwtString
            },
            body: JSON.stringify({
                payload: payload
            })
        };

        // Fetch data from the API
        fetch(URL + '/deleteComment', requestOptions)
            .then(() => {
                // getApiAllPost()
            })
    }


    return (
        <>
            {/* Render posts */}
            {apis?.map((api) => (
                <div
                    key={api._id}
                    className='border border-gray-300 rounded-lg mt-[7px] p-[10px]'>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-row '>
                            <div>
                                <img src='https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ'
                                    className='w-[40px] h-[40px] rounded-lg mt-[5px]'
                                />
                            </div>
                            <div className='text-[18px] ml-[10px]'>
                                <div>
                                    {api.name}
                                </div>
                                <div className='text-[13px] mt-[-16px]'>
                                    {api.updatedAt}
                                </div>
                            </div>
                        </div>
                        <div className='ml-[-20px]'>
                            <DashOutlined width={40} />
                        </div>
                    </div>
                    <div className='mb-[30px]'>
                        <div className='text-[18px]'>
                            {api.content}
                        </div>
                        <div className='flex items-center justify-center w-[600px]'>
                            <div className='flex items-center justify-center '  >
                                <Image src={api.imgs[0]}
                                    className='h-[500px] w-full'
                                    height={400}
                                    width={'100%'}
                                />
                                <div className='w-[50%]'>
                                    {api.imgs[1] != null && api.imgs[2] == null ?
                                        <div  >
                                            <Image src={api.imgs[1]}
                                                width={"100%"}
                                                height={400}

                                            />
                                        </div>
                                        : null
                                    }
                                    {api.imgs[2] ?
                                        <div>
                                            <Image src={api.imgs[2]}
                                                width={"50%"}
                                                className='mt-[-5.5px]'
                                            />
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='text-[16px] flex flex-row justify-between '>
                            <div>
                                {api.feeling?.length}
                            </div>
                            <div>
                                500 bình luận 100 chia sẻ
                            </div>
                        </div>
                        <div className='text-[16px] w-full flex flex-row justify-around'>
                            <Popover content={() => content(api._id)} style={{ color: 'black' }}  >
                                <button className='hover:bg-gray-100 w-[30%] rounded-lg'>
                                    <Button className='w-[30%] rounded-lg' style={{ border: 'none' }} >
                                        <div className='flex flex-row'>
                                            <div>
                                                {api.feeling.find(item => item.user_id === userId) ? (
                                                    <div>
                                                        {api.feeling.find(item => item.user_id === userId).feeling}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <LikeFilled className='text-bg mt-[4px] mr-[2px]' />
                                                        Thích
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Button>
                                </button>
                            </Popover>
                            <button className='hover:bg-gray-100 w-[30%] rounded-lg'>
                                Bình luận
                            </button>
                            <button className='hover:bg-gray-100 w-[30%] rounded-lg'>
                                Chia sẻ
                            </button>
                        </div>
                    </div>
                </div>
            ))}

        </>
    );
}

export default PostsProFile;
