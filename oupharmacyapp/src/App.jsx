import { createContext, useEffect, useReducer, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './modules/common/layout'
import userReducer from './lib/reducer/userReducer'
import Login from './pages/login'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './pages'
import Register from './pages/register'
import ExaminationList from './pages/profile/examinations'
import PrescriptionList from './pages/dashboard/prescribing'
import PrescriptionDetail from './pages/dashboard/prescribing/id'
import Payments from './pages/dashboard/examinations/id/payments'
import ConversationList from './pages/conversations'
import ChatWindow from './pages/conversations/id/recipientID/message'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Booking from './pages/booking'
import Examinations from './pages/dashboard/examinations'
import ProtectedUserRoute from './modules/common/layout/userRoute'
import { ROLE_DOCTOR, ROLE_NURSE } from './lib/constants'
import ProtectedSpecialRoleRoute from './modules/common/layout/specialRole'
import Forbidden from './modules/common/layout/components/403-forbidden'
import NotFound from './modules/common/layout/components/404-not_found'
import WaitingRoom from './pages/waiting-room'
import { QueueStateProvider } from './lib/context/QueueStateContext'
import { useDispatch } from 'react-redux';
import { getAllConfig } from './lib/redux/configSlice'
import Loading from './modules/common/components/Loading'
import { Box } from '@mui/material'
import Demo from './pages/demo'
import { getCookieValue } from './lib/utils/getCookieValue'
import { getListExamToday, getTotalListExamPerDay, setListExamToday } from './lib/utils/helper'
import { fetchListExaminationToday } from './modules/pages/WaittingRoomComponents/services'
import { jobMidnight } from './cron/job/at_midnight'
import { jobEveryMinutes } from './cron/job/every_minutes'
import BackdropLoading from './modules/common/components/BackdropLoading'
import ScrollToTop from './modules/common/components/ScrollToTop'
import { OUPharmacyChatBot } from './chatbot'
import Profile from './pages/profile'
import ProfileAddressInfo from './pages/profile/address-info'
import { UserProvider } from './lib/context/UserContext'
import Diagnosis from './pages/dashboard/examinations/id/diagnosis'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import ProductList from './pages/products'
import Dashboard from './modules/common/layout/dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { PrescribingProvider } from './lib/context/PrescribingContext'


export const userContext = createContext()
const queryClient = new QueryClient()
function App() {

  const configDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const [configData, listExamTodayData] = await Promise.all([
          configDispatch(getAllConfig()).unwrap(),
          getListExamToday(),
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData()
    // jobMidnight()
    // jobEveryMinutes()
  },[])


  

    return isLoading ? <Box className='ou-h-[100vh] ou-flex ou-place-content-center'><Loading/></Box> :
     
    <>
    <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            {/* <CookiesProvider> */}
                        <LocalizationProvider dateAdapter={AdapterMoment}>
            <UserProvider>    
              <PrescribingProvider>
              {/* <userContext.Provider value={[user, dispatch]}> */}
                <QueueStateProvider>
                    <ScrollToTop />
                    <Routes>
                      <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />}/>
                        
                        <Route path='/waiting-room' element={<WaitingRoom/>}/>
                        <Route path='/products' element={<ProductList/>}/>
                        
                        {/* Accepted when user authorized */}
                        <Route element={<ProtectedUserRoute/>}>
                    
                          <Route path='/booking' element={<Booking/>}/>
                          
                          <Route path='/profile' element={<Profile />} >
                            <Route path='/profile/address-info' element={<ProfileAddressInfo />} />
                            <Route path='/profile/examinations' element={<ExaminationList />} />
                          </Route>

                          {/* Accepted user.role = (ROLE_NURSE || ROLE_DOCTOR) */}
                          <Route element={<ProtectedSpecialRoleRoute allowedRoles={[ROLE_DOCTOR, ROLE_NURSE]} />}>
                            <Route path='/examinations' element={<Examinations/>}/> 
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
                          
                
                      </Route>
                      <Route path='/dashboard/' element={<Dashboard/>}>
                      <Route element={<ProtectedUserRoute/>}>                          {/* Accepted user.role = (ROLE_NURSE || ROLE_DOCTOR) */}
                          <Route element={<ProtectedSpecialRoleRoute allowedRoles={[ROLE_DOCTOR, ROLE_NURSE]} />}>
                            <Route path='/dashboard/examinations' element={<Examinations/>}/> 
                          </Route>

                          {/* Accepted user.role = ROLE_DOCTOR */}
                          <Route element={<ProtectedSpecialRoleRoute allowedRoles={[ROLE_DOCTOR]} />}>
                            <Route path='/dashboard/examinations/:examinationId/diagnosis' element={<Diagnosis />} />
                            <Route path='/dashboard/prescribing' element={<PrescriptionList/>} />
                            
                        
                              <Route path='/dashboard/prescribing/:prescribingId' element={<PrescriptionDetail/>} />
                         

                          </Route>

                          {/* Accepted user.role = ROLE_NURSE */}
                          <Route element={<ProtectedSpecialRoleRoute allowedRoles={[ROLE_NURSE]}/>}>
                            <Route path='/dashboard/payments' element={<PrescriptionList/>} />
                            <Route path='/dashboard/payments/examinations/:examinationId' element={<Payments />} />
                          </Route>

                          <Route path='/dashboard/profile' element={<Profile />} >
                            <Route path='/dashboard/profile/address-info' element={<ProfileAddressInfo />} />
                            <Route path='/dashboard/profile/examinations' element={<ExaminationList />} />
                          </Route>

                          <Route path="/dashboard/forbidden" element={<Forbidden />} />
                      </Route>
                      </Route>

                    
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    </Routes>
                   
                </QueueStateProvider>
              {/* </userContext.Provider> */}
            {/* </CookiesProvider> */}   
            </PrescribingProvider>
            </UserProvider>
            </LocalizationProvider>
          </BrowserRouter>
        </I18nextProvider>
    </QueryClientProvider>
      <div>
        <ToastContainer
            position="bottom-left"
            theme='colored'
          />
      </div>
      {/* <OUPharmacyChatBot/> */}
    </>  
}

export default App
