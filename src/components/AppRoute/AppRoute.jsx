import React, {useContext} from 'react'
import {Route, Routes} from "react-router-dom"
import { AuthContext } from '../../context'
import Login from '../../pages/Login'
import Clients from '../../pages/Clients'
import { privateRoutes, publicRoutes } from '../../router'
import { Spin } from 'antd';


const AppRoute = () => {

    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Spin size="large" />
    }

    return (
        isAuth
        ?
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
