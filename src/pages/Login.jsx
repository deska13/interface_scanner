import { Button, Input, Row, Col, Form, Card } from 'antd';
import React, {useContext} from 'react'
import { sendAuth } from '../API/ClientBaseService';
import { AuthContext, TokenContext } from '../context';
import { useFetching } from '../hooks/useFetching';
import '../styles/App.css'


const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const [fetchAuth, isLoading, loadError] = useFetching(async (form) => {
        const response = await sendAuth(form)
        if (response.data){
            setIsAuth(true)
            localStorage.setItem("access_token", response.data.access_token)
        }
        else{
            alert.call("Неверные данные")
        }
    })

    const login = event => {
        fetchAuth(event)
    }

    return (
        <div className='ant-layout-content'>
            <Card>
                <Row>
                    <Col span={24}>
                        <h1>Вход в систему</h1>
                    </Col>
                    <Col span={24}>
                        <Form 
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={login}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off">
                            <Form.Item
                                label="Логин"
                                name="username"
                                rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                            >
                                <Input type="text" placeholder="Введите логин" />
                            </Form.Item>

                            <Form.Item
                                label="Пароль"
                                name="password"
                                rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                            >
                                <Input.Password type="password" placeholder="Введите пароль" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Войти
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default Login
