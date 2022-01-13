import { Button, Input } from 'antd';
import React, {useContext} from 'react'
import { AuthContext } from '../context';

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const login = event => {
        console.log("hello", isAuth)
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Вход в систему</h1>
            <form onSubmit={login}>
                <Input type="text" placeholder="Введите логин" />
                <Input type="password" placeholder="Введите пароль" />
                <Button>Войти</Button>
            </form>
        </div>
    )
}

export default Login
