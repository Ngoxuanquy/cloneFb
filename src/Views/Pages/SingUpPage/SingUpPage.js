import React, { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
// import { LogoGoogle, LogoFacebook, LogoApple } from 'react-ionicons';
import './SingUpPage.css'
import { Link, useNavigate } from 'react-router-dom';


const SingUpPage = () => {

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
        console.log(container);
    }, []);

    //xử lý sự kiện nhấn nút đăng ký
    const URL = process.env.REACT_APP_URL;


    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [re_Pass, setRe_Passs] = useState('')
    const [number, setNumber] = useState('')

    function handerSubmit() {

        console.log(process.env.REACT_APP_KEY)

        if (pass === re_Pass) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.REACT_APP_KEY,
                },
                body: JSON.stringify({
                    name: email,
                    email: email,
                    password: pass,
                })
            };


            // Lấy dữ liệu của khách hàng
            fetch(URL + '/shop/signup', requestOptions)
                .then((data) => {
                    return data.json()
                })
                .then((data) => {
                    console.log(data)
                    alert(data.metadata.msg || "Đăng ký thành công!!")
                    if (data.metadata.msg != "Error: Shop already registered") {
                        window.location = "/login"
                    }
                    else {
                        return;
                    }
                })

        }
        else {
            alert('sai mk')
        }

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
                height: '600px'
            }}>
                <div>
                    <main className="main" style={{
                        zIndex: 100
                    }}>
                        <div className="container">
                            <section className="wrapper">
                                <div className="heading">
                                    <h1 className="text text-large">Đăng Ký</h1>
                                    <p className="text text-normal">New user? <span><a href="#" className="text text-links"
                                        onClick={() => navigate('/Login')}
                                    >
                                        Has been account</a></span>
                                    </p>
                                </div>
                                <div name="signin" className="form" style={{
                                    display: 'flex',
                                    flexDirection: 'column'
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
                                            onChange={(e) => setPass(e.target.value)}

                                        />
                                    </div>
                                    <div className="input-control" style={{
                                        width: '100%'
                                    }}>
                                        <label for="password" className="input-label" hidden>Nhập lại Password</label>
                                        <input type="password" name="password" id="password" className="input-field" placeholder="Nhập lại Password"
                                            onChange={(e) => setRe_Passs(e.target.value)}

                                        />
                                    </div>
                                    <div className="input-control" style={{
                                        width: '100%'
                                    }}>
                                        <a href="#" className="text text-links">Forgot Password</a>

                                        <input type="submit" name="submit" className="input-submit" value="Sign In"
                                            onClick={() => handerSubmit()}
                                        />
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
                </div>
            </div>
        </>
    );
};

export default SingUpPage;
