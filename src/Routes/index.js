import {
    HomePage,
    Video,
    FriendPages,
    LoginPage,
    SingUpPage,
    ProfilePages,
    ChatPages,
    Nofitication_Post
} from "../Views"




export const publicRoute = [
    { path: "/", component: <HomePage /> },
    { path: "/Home", component: <HomePage /> },
    { path: "/Video", component: <Video /> },
    { path: "/Nofitication_Post/:post_id", component: <Nofitication_Post /> },

]


export const privateRoute = [
    { path: "/Login", component: <LoginPage /> },
    { path: "/Singup", component: <SingUpPage /> },
    { path: "/ProfilePages", component: <ProfilePages /> },
    { path: "/Friend/:searchKey", component: <FriendPages /> },
    { path: "/Messages", component: <ChatPages /> },



]