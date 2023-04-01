import { createContext, useEffect, useReducer, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './modules/common/layout'
import userReducer from './lib/reducer/userReducer'
import Login from './pages/login'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages'
import Register from './pages/register'
import ExaminationList from './pages/users/examinations'
import Diagnosis from './pages/examinations/id/diagnosis'
import PrescriptionList from './pages/prescribing'
import PrescriptionDetail from './pages/prescribing/id'
import Payments from './pages/examinations/id/payments'
import ConversationList from './pages/conversations'
import ChatWindow from './pages/conversations/id/recipientID/message'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Booking from './pages/booking'
import Examinations from './pages/examinations'
import ProtectedUserRoute from './modules/common/layout/userRoute'
import { BACKEND_BASEURL, ROLE_DOCTOR, ROLE_NURSE } from './lib/constants'
import ProtectedSpecialRoleRoute from './modules/common/layout/specialRole'
import Forbidden from './modules/common/layout/components/403-forbidden'
import NotFound from './modules/common/layout/components/404-not_found'
import WaitingRoom from './pages/waiting-room'
import { QueueStateProvider } from './lib/context/QueueStateContext'
// import ExaminationDetail from './pages/examinations/id'
import { useDispatch } from 'react-redux';
import { getAllConfig } from './lib/redux/configSlice'
import Loading from './modules/common/components/Loading'
import { Box } from '@mui/material'
import Demo from './pages/demo'
import { getCookieValue } from './lib/utils/getCookieValue'
import { fetchOncePerDay } from './lib/utils/fetchOnePerDay'
import { endpoints } from './config/APIs'

export const userContext = createContext()
const queryClient = new QueryClient()
function App() {

  const configDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const [user, dispatch] = useReducer(userReducer, getCookieValue('user'))
  
  useEffect(()=> {
    Promise.all([
      configDispatch(getAllConfig()).unwrap(),
      fetchOncePerDay(BACKEND_BASEURL + endpoints['get-list-exam-today'], (data) => {
        console.log(data);
      })
    ])
      .then((res) => console.log('Mới vào app: ', res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  },[])


  

    return isLoading ? <Box><Loading/></Box> :
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            {/* <CookiesProvider> */}
              <userContext.Provider value={[user, dispatch]}>
                <QueueStateProvider>
                    <Routes>
                      <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />}/>
                        
                        <Route path='/waiting-room' element={<WaitingRoom/>}/>
                        {/* Accepted when user authorized */}
                        <Route element={<ProtectedUserRoute/>}>
                    
                          <Route path='/booking' element={<Booking/>}/>
                          <Route path='/users/examinations' element={<ExaminationList />} />


                          {/* Accepted user.role = (ROLE_NURSE || ROLE_DOCTOR) */}
                          <Route element={<ProtectedSpecialRoleRoute allowedRoles={[ROLE_DOCTOR, ROLE_NURSE]} />}>
                            <Route path='/examinations' element={<Examinations/>}/> 
                            {/* <Route path='/examinations/:examinationId' element={<ExaminationDetail/>}/>  */}
                          </Route>

                          {/* Accepted user.role = ROLE_DOCTOR */}
                          <Route element={<ProtectedSpecialRoleRoute allowedRoles={[ROLE_DOCTOR]} />}>
                            <Route path='/examinations/:examinationId/diagnosis' element={<Diagnosis />} />
                            <Route path='/prescribing' element={<PrescriptionList/>} />
                            <Route path='/prescribing/:prescribingId' element={<PrescriptionDetail/>} />
                          </Route>

                          {/* Accepted user.role = ROLE_NURSE */}
                          <Route element={<ProtectedSpecialRoleRoute allowedRoles={[ROLE_NURSE]}/>}>
                            <Route path='/examinations/:examinationId/payments' element={<Payments />} />
                          </Route>

                          <Route path='/conversations'  element={<ConversationList/>} >
                            <Route path='/conversations/:conversationId/:recipientId/message' element={<ChatWindow/>} />
                          </Route>

                        </Route>
                        <Route path="/forbidden" element={<Forbidden />} />
                       
                        <Route path="*" element={<NotFound/>} />
                        <Route path='/demo' element={<Demo/>}/>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                     
                      </Route>
                    </Routes>
                </QueueStateProvider>
              </userContext.Provider>
            {/* </CookiesProvider> */}
          </BrowserRouter>
        </I18nextProvider>
      </QueryClientProvider>
    
  
}

export default App
