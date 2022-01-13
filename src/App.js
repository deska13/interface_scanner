import React, {useState, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom"
import './styles/App.css'
import AppRoute from './components/AppRoute/AppRoute';
import { AuthContext } from './context';
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd';
import { 
  UsergroupAddOutlined,
  CommentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom'



const { Header, Sider, Content, Footer } = Layout;

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const [collapsed, setCollapsed] = useState(true)
  const toggleCollapsed = () => {
      console.log(collapsed)
      setCollapsed(!collapsed)
  }

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth, 
      isLoading
    }}>
      <BrowserRouter>
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
              <AppRoute />
            </Content>
            <Footer>
              Текст
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}


export default App;