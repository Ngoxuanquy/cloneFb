



const DefaultLayout = ({ children }) => {

    return (
        <div style={{
            margin: 0,
            padding: 0,
            width: '70%'
        }} >
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default DefaultLayout