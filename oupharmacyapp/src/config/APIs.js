import axios from 'axios'
import cookies from 'react-cookies'
axios.defaults.withCredentials = false;


export let endpoints = {
    
    // Auth info
    'auth-info': '/oauth2-info/',

    // token user
    'login': '/o/token/',
    'current-user':'/users/current-user/',

    // Role
    'roles': "/roles/",

    // User
    'users':'/users/',
    'user-detail':(userId) => `/users/${userId}/`,
    'booking-list':(userId) => `/users/${userId}/booking-list/`,

    // Patient
    'get-patient-by-email':'/patients/get-patient-by-email/',
    'patient':'/patients/',
    'patient-detail': (patientId)=>  `/patients/${patientId}/`,
    
    // Examination
    'examination':'/examinations/',
    'get-total-exam-today':'/examinations/get-total-exam-today/',
    'examination-detail': (examinationId) => `/examinations/${examinationId}/`,
    'send-mail': (examinationId) => `/examinations/${examinationId}/send_mail/`,
    'get-diagnosis': (examinationId) => `/examinations/${examinationId}/get-diagnosis/`,
    // Diagnosis
    'diagnosis':'/diagnosis/',
    'prescription':(diagnosisId) => `/diagnosis/${diagnosisId}/`,
    
    // Prescripbing:
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
}
export const authApi = () => {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
          'Authorization': `Bearer ${cookies.load('token')}`
        }
      });
    
      instance.interceptors.response.use(
        response => response,
        async error => {
          const originalRequest = error.config;
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
    
            // call refresh token API to get new access token
            const refreshToken =  cookies.load('refresh_token');
            const res = await axios.post('http://127.0.0.1:8000/refresh-token', {
              refreshToken
            });
    
            if (res.status === 200) {
              // update access token in cookies
              console.log("refresh ne")
              cookies.save('token', res.data.accessToken)
            //   Cookies.set('token', res.data.accessToken);
    
              // set authorization header with new token and retry the original request
              instance.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
              return instance(originalRequest);
            }
          }
          return Promise.reject(error);
        }
      );
    
      return instance;
}

export const authMediaApi = () => {
    return axios.create({
        baseURL: "http://127.0.0.1:8000",
        headers: {
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000",
})

