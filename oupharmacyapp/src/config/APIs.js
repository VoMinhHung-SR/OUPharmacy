import axios from 'axios'
import cookies from 'react-cookies'

axios.defaults.withCredentials = false;

export let endpoints = {
    // Auth info
    'auth-info': '/oauth2-info/',
    // token user
    'login': '/o/token/',
    'current-user':'/users/current-user/',
    'register': '/users/',
    'users':'/users/',
    'user-detail':(userId) => `/users/${userId}/`,/*  */
    'notifications':(userId) => `/users/${userId}/notifications/`,
    'booking-list':(userId) => `/users/${userId}/booking-list/`,
    // Patient
    'get-patient-by-email':'/patients/get-patient-by-email/',
    'patient':'/patients/',
    'patient-detail': (patientId)=>  `/patients/${patientId}/`,

    // Examination
    'examination':'/examinations/',
    'examination-detail': (examinationId) => `/examinations/${examinationId}/`,
    'send-mail': (examinationId) => `/examinations/${examinationId}/send_mail/`,
    'get-prescription-by-examinationId': (examinationId) => `/examinations/${examinationId}/get-pres-by-examinationId/`,
    
    // Prescription
    'prescriptions':'/prescriptions/',
    'prescription':(prescriptionId) => `/prescriptions/${prescriptionId}/`,
    'get-prescription-detail-by-prescId': (prescriptionId) => `/prescriptions/${prescriptionId}/get-pres-detail/`,
    // Prescription Detail
    'prescription-detail':'/prescription-details/',
    
    //Medicine Units
    'medicine-units':'/medicine-units/',

    // Bill
    'bill':'/bills/',
    'receipt':'/bills/get-bill-by-pres/',
    'momoPayUrl':'/bills/momo-payments/',
}
export const authApi = () => {
    return axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export const authMediaApi = () => {
    return axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            'Content-Type' : 'multipart/form-data',
        }
    })
}

export default axios.create({
    baseURL: "http://localhost:8000"
})