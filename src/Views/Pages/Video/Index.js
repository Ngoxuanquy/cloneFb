import React from 'react'
import { Contairner_Left } from '../../../Components'
import { Image } from 'antd';
import { Button, Popover } from 'antd';
import {
    AppstoreOutlined,
    CalendarOutlined,
    NodeCollapseOutlined,
    PlayCircleTwoTone,
    HomeFilled,
    PercentageOutlined,
    LikeFilled
} from '@ant-design/icons';

function Index() {
    const content = (
        <div className='text-3xl'>
            <span className='w-[30px]'>
                👍
            </span>
            <span>
                😒
            </span>
            <span>
                😍
            </span>
            <span>
                ❤️
            </span>
            <span>
                🤣
            </span>
        </div>
    );
    return (
        <div className="mt-10 text-black ">
            <div className='flex flex-row justify-around '>
                <div style={{
                    overflowY: 'scroll',
                    position: 'fixed',
                    height: '100vh',
                    overflowY: "auto",

                }}
                    className="scroll-container"
                >

                    {/* Đăng ảnh */}
                    <div className='w-[650px] border border-gray-300 rounded-lg  mt-[7px] p-[10px]'>
                        <div className='flex flex-row'>
                            <div>
                                <img src='https://vcdn1-dulich.vnecdn.net/2022/07/04/11-5977-1656858349-1656932044-3356-1656932377.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wlMP_C-PBfELkksQF0D3kQ'
                                    className='w-[40px] h-[40px] rounded-lg mt-[5px]'
                                />
                            </div>
                            <div className='text-[18px] ml-[10px]'>
                                <div>
                                    Ngô Xuân Quy
                                </div>
                                <div className='text-[13px] mt-[-16px]'>
                                    1 giờ trước
                                </div>
                            </div>
                        </div>
                        <div className='mb-[130px]'>
                            <div className='text-[18px]'>
                                Ngô Xuân Quy
                            </div>
                            <div>
                                <iframe width="873" height="491" src="https://www.youtube.com/embed/tXsvyy7fDdA" title="&quot;Hội Anti Ý Nhi&quot; bị Công An mời lên Phường Yêu cầu Khóa Group, &quot;Ý Nhi chưa được dạy dỗ kỹ lưỡng&quot;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </div>
                            <div className='text-[16px] flex flex-row justify-between '>
                                <div>
                                    1k
                                </div>
                                <div>
                                    500 bình luận 100 chia sẻ
                                </div>
                            </div>
                            <div className='text-[16px] w-full flex flex-row justify-around'>
                                <Popover content={content} style={{
                                    color: 'black'
                                }}>
                                    <button className='hover:bg-gray-100 w-[30%] rounded-lg'>
                                        <Button className='w-[30%] rounded-lg' style={{
                                            border: 'none'
                                        }}>
                                            <div className='flex flex-row'>
                                                <LikeFilled className='text-bg mt-[4px] mr-[2px]' />
                                                <div>
                                                    Thích
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


                </div>
                <div className='scroll-containe-rigth' >
                    <div style={{
                        overflowY: 'scroll',
                        position: 'fixed',
                        height: '100vh',
                        right: '40px',
                    }}
                        className="scroll-container"
                    >
                        {/* Được tài trợ */}
                        <div className='text-[20px]'>
                            Được tài trợ
                        </div>
                        <div className='flex flex-row items-center'>
                            <div>
                                <img src="https://thcs-thptlongphu.edu.vn/wp-content/uploads/2023/03/hinh-anh-dep-tren-mang2b252822529-1.jpg" className='h-[150px] w-[130px]' />
                            </div>
                            <div className='text-[20px] text-center '>
                                Đăng ký ngay
                            </div>
                        </div>
                        <div className='flex flex-row items-center mt-[10px] '>
                            <div>
                                <img src="https://thcs-thptlongphu.edu.vn/wp-content/uploads/2023/03/hinh-anh-dep-tren-mang2b252822529-1.jpg" className='h-[150px] w-[130px]' />
                            </div>
                            <div className='text-[20px] text-center'>
                                Đăng ký ngay
                            </div>
                        </div>
                        <div>
                            <div className='text-[18px]' style={{
                                marginTop: '20px',
                                borderTop: '1px solid black',
                            }}>
                                Trang và trang cá nhân của bạn
                            </div>
                            <div>
                                <div>
                                    <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-lg' />
                                </div>
                            </div>
                        </div>
                        <div className='text-[18px]' style={{
                            marginTop: '20px',
                            borderTop: '0.4px solid black',
                        }}>
                            <div>
                                Người liên hệ
                            </div>
                            <div className='mt-[10px] flex flex-row '>
                                <div>
                                    <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-full' />
                                </div>
                                <div className='ml-[10px] mt-[7px]'>
                                    Ngô Xuân Quy
                                </div>
                            </div>
                            <div className='mt-[10px] flex flex-row '>
                                <div>
                                    <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-full' />
                                </div>
                                <div className='ml-[10px] mt-[7px]'>
                                    Ngô Xuân Quy
                                </div>
                            </div>
                            <div className='mt-[10px] flex flex-row '>
                                <div>
                                    <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-full' />
                                </div>
                                <div className='ml-[10px] mt-[7px]'>
                                    Ngô Xuân Quy
                                </div>
                            </div>
                            <div className='mt-[10px] flex flex-row '>
                                <div>
                                    <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-full' />
                                </div>
                                <div className='ml-[10px] mt-[7px]'>
                                    Ngô Xuân Quy
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Index