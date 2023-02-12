import { createContext, useReducer } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './modules/common/layout'
import userReducer from './lib/reducer/userReducer'
import Login from './pages/login'
import { QueryClient, QueryClientProvider } from 'react-query'
import ExaminationsConfirm from './pages/examinations/confirm'
import Home from './pages'
import Register from './pages/register'
import Examination from './pages/examinations'
import cookies from "react-cookies";
import ExaminationList from './pages/users/examinations'
import Diagnosis from './pages/examinations/id/diagnosis'
import PrescriptionList from './pages/prescriptions'
import PrescriptionDetail from './pages/prescriptions/id'
import Payments from './pages/examinations/id/payments'
import ConversationList from './pages/conversations'
import ChatWindow from './pages/conversations/id/recipientID/message'
import LanguageProvider from './lib/context/LanguageContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

export const userContext = createContext()

const queryClient = new QueryClient()
function App() {
  const [user, dispatch] = useReducer(userReducer, cookies.load('user'))
  return (
    <QueryClientProvider client={queryClient}>
      {/* <LanguageProvider> */}
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          {/* <CookiesProvider> */}
            <userContext.Provider value={[user, dispatch]}>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route path='/' element={<Home />}/>
                  <Route path='/booking' element={<Examination/>}/>
                  <Route path='/examinations' element={<ExaminationsConfirm/>}/>
                  <Route path='/examinations/:examinationId/diagnosis' element={<Diagnosis />} />
                  <Route path='/examinations/:examinationId/payments' element={<Payments />} />

                  <Route path='/users/examinations' element={<ExaminationList />} />
                  
                  <Route path='/prescriptions' element={<PrescriptionList/>} />
                  <Route path='/prescriptions/:prescriptionId' element={<PrescriptionDetail/>} />

                  <Route path='/conversations'  element={<ConversationList/>} >
                    <Route path='/conversations/:conversationId/:recipientId/message' element={<ChatWindow/>} />
                  </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
              </userContext.Provider>
          {/* </CookiesProvider> */}
        </BrowserRouter>
      {/* </LanguageProvider> */}
      </I18nextProvider>
    </QueryClientProvider>
  )
}

export default App
