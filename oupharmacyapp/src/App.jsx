import { useReducer } from 'react'
import cookie from 'react-cookies'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './modules/common/layout'
import userReducer from './lib/reducer/userReducer'
import Login from './pages/login'
import { QueryClient, QueryClientProvider } from 'react-query'
import ExaminationsConfirm from './pages/examinations/confirm'

const queryClient = new QueryClient()
function App() {
  const [user, dispatch] = useReducer(userReducer, cookie.load('user'))
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route path='/examinations/confirm' element={<ExaminationsConfirm/>}/>
              </Route>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
            </Routes>
        
        
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
