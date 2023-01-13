import { useReducer } from 'react'
import cookie from 'react-cookies'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './modules/common/layout'
import userReducer from './lib/reducer/userReducer'

function App() {
  const [user, dispatch] = useReducer(userReducer, cookie.load('user'))
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
