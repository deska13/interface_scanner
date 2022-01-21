import React, {useContext, useState, useEffect} from 'react'
import {Redirect, Route, Routes} from "react-router-dom"
import { AuthContext } from '../../context'
import Login from '../../pages/Login'
import Clients from '../../pages/Clients'
import { privateRoutes, publicRoutes } from '../../router'
import { Spin } from 'antd';
import { Button, Layout, Menu } from 'antd';
import { 
    UsergroupAddOutlined,
    CommentOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined, 
    ImportOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'



const { Header, Sider, Content, Footer } = Layout;

const AppRoute = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [isLoading, setLoading] = useState(true)
    const [collapsed, setCollapsed] = useState(true)

    const toggleCollapsed = () => {
        console.log(collapsed)
        setCollapsed(!collapsed)
    }

    const logout = () => {
        localStorage.clear()
        setIsAuth(false)
    }

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(false)
        }
        setLoading(false)
    }, [])

    if (isLoading) {
        return <Spin size="large" />
    }

    return (
        isAuth
        ?
        <Layout>
            <Sider 
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
                trigger={null} 
                collapsible 
                collapsed={collapsed}>
                <Menu mode="inline" inlineCollapsed={collapsed}>
                    <Menu.Item icon={<UsergroupAddOutlined />}>
                        <Link to="clients">Клиенты</Link>
                    </Menu.Item>
                    <Menu.Item icon={<CommentOutlined />}>
                        <Link to="about">Связь</Link>
                    </Menu.Item>
                    <Menu.Item icon={<ImportOutlined />}>
                        <Button onClick={() => logout()}>Выйти</Button>
                    </Menu.Item>
                </Menu> 
            </Sider>
            <Layout className="site-layout" 
            style={collapsed
                ? { marginLeft: 80 }
                :
                { marginLeft: 200 }
            }
            >
                <Header className="site-layout-background">
                    {React.createElement(collapsed ? 
                    MenuUnfoldOutlined : 
                    MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggleCollapsed,
                    })}
                </Header>
                <Content
                    className="site-layout-background">
                    <Routes>
                        {privateRoutes.map(route => 
                                <Route 
                                    element={<route.component />} 
                                    path={route.path}
                                    exact={route.exact}
                                    key={route.path}
                                />
                        )}
                        <Route
                            path="*"
                            element={<Clients />}
                        />
                    </Routes>
                </Content>
            <Footer>
                Текст
            </Footer>
        </Layout>
    </Layout>
        :
        <Routes>
            {publicRoutes.map(route => 
                    <Route 
                        element={<route.component />} 
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
            )}
            <Route
                path="*"
                element={<Login />}
            />
        </Routes>
    )
}

export default AppRoute
