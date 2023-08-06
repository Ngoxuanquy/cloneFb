import React, { useState } from 'react';
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    GatewayOutlined,
    PlayCircleTwoTone,
    PlaySquareOutlined,
} from '@ant-design/icons';
import { Divider, Switch } from 'antd';
import { MenuTheme } from 'antd/es/menu';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const items = [
    getItem('Home', '1', <MailOutlined />),
    getItem('Video', '2', <PlayCircleTwoTone />),
    getItem('Friend', '3', <CalendarOutlined />),
    getItem('Messages', '4', <PlaySquareOutlined />),
    getItem('Game', 'sub1', <AppstoreOutlined />, [
        getItem('Option 3', '5'),
        getItem('Option 4', '6'),
        getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '7'), getItem('Option 6', '8')]),
    ]),
    getItem('Group', 'sub2', <SettingOutlined />, [
        getItem('Option 7', '9'),
        getItem('Option 8', '10'),
        getItem('Option 9', '11'),
        getItem('Option 10', '12'),
    ]),
    getItem(
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Ant Design
        </a>,
        'link',
        <LinkOutlined />,
    ),
];

function App() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mode, setMode] = useState('inline');
    const [theme, setTheme] = useState('dark');
    const { colorBgContainer } = useState()

    const changeMode = (value) => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <div style={{ margin: 0, padding: 0, width: '100%', }} >
            <Layout style={{ minHeight: '100vh', backgroundColor: 'white', width: '100%', }} inlineIndent={20} >
                <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} theme={theme} width={300} >
                    <div style={{
                        marginTop: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // width: '500px'
                    }}>
                        <div style={{
                            width: '80%',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,.2)',
                            zIndex: 10,
                            borderRadius: '10px',
                        }}>

                        </div>
                    </div>
                    <div className="demo-logo-vertical" />
                    <br />
                    <div
                        style={{
                            width: '100%',
                            alignContent: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Switch onChange={changeMode} checkedChildren="Full" unCheckedChildren="..." />
                        <Divider type="vertical" />
                        <Switch onChange={changeTheme} checkedChildren="Tối" unCheckedChildren="Sáng" />
                    </div>
                    <br />
                    <br />
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={mode}
                        theme={theme}
                        items={items}
                        onClick={({ key, item }) => {
                            if (item.props.children[1].props.props.children[1].props.children) {
                                const url = item.props.children[1].props.props.children[1].props.children;
                                navigate(`/${url}`);
                            }
                        }}
                        style={{
                            width: '100%',
                        }}
                    />
                </Sider>
                {/* <div style={{
                    width: '100%',

                }}> */}
                {/* <Layout style={{
                        width: '100%'
                    }}>
                        <Header style={{ padding: 0, backgroundColor: 'white', width: '100%', height: '100%' }} >
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Header>
                        <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                        theme={theme}
                    >
                        Content
                    </Content>
                    </Layout> */}
                {/* </div> */}
            </Layout>
        </div >
    );
}

export default App;
