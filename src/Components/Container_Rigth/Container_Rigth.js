import React from 'react'
import { Button, Popover, Modal, Input, Badge, Upload } from 'antd';

function Container_Rigth() {
    return (
        <div className=' w-[300px] ' style={{
        }}>
            <div style={{
                overflowY: 'scroll',
                position: 'fixed',
                height: '100vh',
                right: '40px',
                zIndex: -100
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
                            <Badge dot >
                                <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-full' />
                            </Badge>
                        </div>
                        <div className='ml-[10px] mt-[7px]'>
                            Ngô Xuân Quy
                        </div>
                    </div>
                    <div className='mt-[10px] flex flex-row '>
                        <div>
                            <Badge dot>
                                <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-full' />
                            </Badge>
                        </div>
                        <div className='ml-[10px] mt-[7px]'>
                            Ngô Xuân Quy
                        </div>
                    </div>
                    <div className='mt-[10px] flex flex-row '>
                        <div>
                            <Badge dot>
                                <img src="https://i.pinimg.com/474x/13/66/24/13662403df40419741a2858e38135a5c.jpg" className='w-[50px] h-[50px] rounded-full' />
                            </Badge>
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
    )
}

export default Container_Rigth