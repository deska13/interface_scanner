import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom"
import './styles/App.css'
import AppRoute from './components/AppRoute/AppRoute';
import { AuthContext } from './context';
import 'antd/dist/antd.css'


function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth, 
      isLoading
    }}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}


export default App;