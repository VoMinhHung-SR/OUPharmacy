import axios from 'axios'
import Cookies from 'js-cookie';
import { BACKEND_BASEURL, PRD_BACKEND_BASEURL } from '../lib/constants';
axios.defaults.withCredentials = false;


export let endpoints = {
    
    // Auth info
    'auth-info': '/oauth2-info/',

    // token user
    'login': '/o/token/',
    'current-user':'/users/current-user/',

    // Role
    'roles': "/roles/",
    // Commmon District 
    'districts-by-city': '/common-districts/get-by-city/',
    // Common Location
    'location':'/common-locations/', 
    // User
    'users':'/users/',
    'user-detail':(userId) => `/users/${userId}/`,
    'get-user-location':(userId) => `/users/${userId}/location-info/`,
    'booking-list':(userId) => `/users/${userId}/booking-list/`,

    // Patient
    'get-patient-by-email':'/patients/get-patient-by-email/',
    'patient':'/patients/',
    'patient-detail': (patientId)=>  `/patients/${patientId}/`,
    
    // Examination
    'examination':'/examinations/',
    'get-total-exams': '/examinations/get-total-exams/', // Get total exams today or input "date"
    'get-list-exam-today':'/examinations/get-list-exam-today/',
    'examination-detail': (examinationId) => `/examinations/${examinationId}/`,
    'send-mail': (examinationId) => `/examinations/${examinationId}/send_mail/`,
    'send-email-remind1': (examinationId) => `/examinations/${examinationId}/send_email_remind1/`, // Email remind go to OUPharmacy
    'get-diagnosis': (examinationId) => `/examinations/${examinationId}/get-diagnosis/`,
    
    // Diagnosis
    'diagnosis':'/diagnosis/',
    'get-medical-records':'/diagnosis/get-medical-records/',
    'prescription':(diagnosisId) => `/diagnosis/${diagnosisId}/`,
    
    // Prescribing:
    'prescribing': '/prescribing/',
    'get-pres-by-diagnosis': '/prescribing/get-by-diagnosis/',
    'get-prescription-detail': (prescribingID) => `/prescribing/${prescribingID}/get-pres-detail/`,

    // Prescription Detail
    'prescription-detail':'/prescription-details/',
    
    //Medicine Units
    'medicine-units':'/medicine-units/',
    
    // Bill
    'bill':'/bills/',
    'receipt':'/bills/get-bill-by-pres/',
    'momoPayUrl':'/bills/momo-payments/',
    'zaloPayUrl':'/bills/zalo-payments/',

    // Common Config:
    'common-configs': '/common-configs/'
}
let baseURL;
if (process.env.NODE_ENV === 'production') {
  baseURL = PRD_BACKEND_BASEURL;
} else {
  baseURL = BACKEND_BASEURL;
}
// const baseURL = BACKEND_BASEURL;
const mapBaseURL = "https://rsapi.goong.io"  

export const mapApi = () => {
  return axios.create({
    baseURL: mapBaseURL,
    headers: {
        'Authorization' : 'application/json',
    }})
}

export const authApi = () => {
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
    
      instance.interceptors.response.use(
        response => response,
        async error => {
          const originalRequest = error.config;
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
    
            // call refresh token API to get new access token
            const refreshToken =  Cookies.get('refresh_token');
            const clientApp = await axios.get(`${baseURL}/oauth2-info/`)
            if(clientApp.status === 200){
                const data = {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: clientApp.data.client_id,
                    client_secret: clientApp.data.client_secret
                }

                const res = await axios.post(`${baseURL}/o/token/`, data);
                if (res.status === 200) {
                    // update access token in cookies 
                    Cookies.set('refresh_token', res.data.refresh_token)
                    Cookies.set('token', res.data.access_token)
          
                    // console.log(`Bearer ${res.data.access_token}`)
                    // set authorization header with new token and retry the original request
                    instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
                    return instance(originalRequest);
                  }
            }
           
          }
          return Promise.reject(error);
        }
      );
    
      return instance;
}

export const authMediaApi = () => {
    return axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export default axios.create({
    baseURL: baseURL,
})

