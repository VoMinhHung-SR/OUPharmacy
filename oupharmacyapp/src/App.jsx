import { createContext, useReducer } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './modules/common/layout'
import userReducer from './lib/reducer/userReducer'
import Login from './pages/login'
import { QueryClient, QueryClientProvider } from 'react-query'
import ExaminationsConfirm from './pages/examinations/confirm'
import { Cookies, CookiesProvider, useCookies } from 'react-cookie'
import Home from './pages'
import Register from './pages/register'

export const userContext = createContext()

const queryClient = new QueryClient()
function App() {
  const [cookies] = useCookies(['user']);
  const [user, dispatch] = useReducer(userReducer, cookies.user)
  return (
    <QueryClientProvider client={queryClient}>
      
      <BrowserRouter>
        <CookiesProvider>
          <userContext.Provider value={[user, dispatch]}>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/' element={<Home />}/>
                <Route path='/examinations/confirm' element={<ExaminationsConfirm/>}/>
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            </userContext.Provider>
        </CookiesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
