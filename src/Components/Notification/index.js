import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Navbar = () => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState("");
    const [user, setUser] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Establish the socket connection
        const newSocket = io("http://localhost:3056");
        setSocket(newSocket);

        // Clean up the socket on component unmount
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        // Register the user with the server upon socket connection
        if (socket) {
            socket.emit("newUser", user);

            // Listen for incoming notifications
            socket.on("getNotification", (data) => {
                setNotifications((prev) => [...prev, data]);
            });
        }
    }, [socket, user]);

    const displayNotification = ({ senderName, type }) => {
        let action;

        if (type === 1) {
            action = "liked";
        } else if (type === 2) {
            action = "commented";
        } else {
            action = "shared";
        }
        return (
            <span className="notification">{`${senderName} ${action} your post.`}</span>
        );
    };

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };

    return (
        <div className="navbar">
            {/* <span className="logo">Lama App</span> */}
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} className="iconImg" alt="" />
                    {
                        notifications?.length > 0 &&
                        <div className="counter">{notifications?.length}</div>
                    }
                </div>
                <div className="icon" onClick={() => setOpen(!open)}>
                    {/* <img src={Message} className="iconImg" alt="" /> */}
                </div>
                <div className="icon" onClick={() => setOpen(!open)}>
                    {/* <img src={Settings} className="iconImg" alt="" /> */}
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((n) => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>
                        Mark as read
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
