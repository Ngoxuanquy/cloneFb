import React, { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
// import { LogoGoogle, LogoFacebook, LogoApple } from 'react-ionicons';
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// import dotenv from 'dotenv';
// dotenv.config();
const App = () => {

    const URL = process.env.REACT_APP_URL;

    const navigate = useNavigate();

    const particlesInit = useCallback(async (engine) => {
        console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        // console.log(container);
    }, []);

    //khai báo email, pass
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log(email)

    //xử lý sự kiện nhấn nút đăng ký

    const handerSubmit = () => {

        console.log(URL)

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.REACT_APP_KEY,
            },
            body: JSON.stringify({
                email: email,
                password: password
            },)
        };


        // Lấy dữ liệu của khách hàng
        fetch(URL + '/shop/login', requestOptions)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                console.log(data.metadata)
                // if (data.metadata.shop.verify == true) {
                //     alert("Tài khoản đã đăng nhập ở 1 nơi khác!!!")
                // }
                if (data.metadata.msg !== 'Shop not registered') {
                    if (data.metadata.status == "Tài Khoản Bạn Đã Bị Khóa!!") {
                        alert(data.metadata.status)
                        return;
                    }
                    const token = data.metadata.tokens.accessToken
                    const name = data.metadata.shop.email

                    const secretKey = 'my-secret-key';

                    Cookies.set('accessToken', JSON.stringify(token), { expires: 7 });
                    Cookies.set('name', JSON.stringify(name), { expires: 7 });
                    localStorage.setItem("chat-app-current-user", JSON.stringify(data.metadata.shop))

                    // console.log('aa')
                    Cookies.set('id', JSON.stringify(data.metadata.shop._id), { expires: 7 });
                    Cookies.set('img', JSON.stringify(data.metadata.shop.img), { expires: 7 });
                    Cookies.set('timeeexp', JSON.stringify(data.metadata.tokens.timeExp), { expires: 7 });
                    // window.location = "/";
                    // if (data.metadata.shop.roles[0] == "SHOP") {
                    // alert(data.metadata.status)
                    navigate('/')
                    // }
                    // else {
                    //     navigate('/api/admin')

                    // }
                    // navigate('/', { state: { data: data.metadata.shop.roles[0] } });
                }
                else {
                    alert("Sai mật khẩu hoặc tài khoản!!")
                }

            });

    }

    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                style={{
                    zIndex: -1
                }}
                options={{
                    style: {
                        zIndex: -1
                    },
                    background: {
                        color: {
                            value: "#111111",
                        },
                    },
                    fpsLimit: 120,
                    interactivity: {
                        detectsOn: "canvas",
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            >
                <div style={{
                    zIndex: 1000
                }}>
                    hello
                </div>
            </Particles>
            <div style={{
                zIndex: 100,
                backgroundColor: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                borderRadius: '10px'
            }}>
                <div>
                    <main className="main" style={{
                        zIndex: 100
                    }}>
                        <div className="container">
                            <section className="wrapper">
                                <div className="heading">
                                    <h1 className="text text-large">Đăng Nhập</h1>
                                    <p className="text text-normal">New user? <span><a
                                        onClick={() => navigate('/Singup')}
                                        className="text text-links">Create an account</a></span>
                                    </p>
                                </div>
                                <div name="signin" className="form" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%'
                                }}>
                                    <div className="input-control" style={{
                                        width: '100%'
                                    }}>
                                        <label for="email" className="input-label" hidden>Email Address</label>
                                        <input type="email" name="email" id="email" className="input-field" placeholder="Email Address"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-control" style={{
                                        width: '100%'
                                    }}>
                                        <label for="password" className="input-label" hidden>Password</label>
                                        <input type="password" name="password" id="password" className="input-field" placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-control" style={{
                                        width: '100%'
                                    }}>
                                        <a href="#" className="text text-links">Forgot Password</a>
                                        <input type="submit" name="submit" className="input-submit" value="Sign In"
                                            onClick={() => handerSubmit()}
                                        />
                                        {/* <button onClick={() => handerSubmit()}>
                                            Đăng Nhập
                                        </button> */}
                                    </div>
                                </div>
                                <div className="striped">
                                    <span className="striped-line"></span>
                                    <span className="striped-text">Or</span>
                                    <span className="striped-line"></span>
                                </div>
                                <div className="method">
                                    <div className="method-control">
                                        <a href="#" className="method-action">
                                            {/* <LogoGoogle fontSize="1.65rem" color="#F44336" className="mr-[6px]" /> */}
                                            <span>Sign in with Google</span>
                                        </a>
                                    </div>
                                    <div className="method-control">
                                        <a href="#" className="method-action">
                                            {/* <LogoFacebook fontSize="1.65rem" color="blue" className="mr-[6px]" /> */}
                                            <span>Sign in with Facebook</span>
                                        </a>
                                    </div>
                                    <div className="method-control">
                                        <a href="#" className="method-action">
                                            {/* <LogoApple fontSize="1.65rem" color="gray" className="mr-[6px]" /> */}
                                            <span>Sign in with Apple</span>
                                        </a>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                </div >
            </div >
        </>
    );
};

export default App;
