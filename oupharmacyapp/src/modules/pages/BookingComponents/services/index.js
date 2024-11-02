import { authApi, endpoints } from "../../../../config/APIs"

// To get patient info by patient.email
// if patient doest exist return -1 => ready for create new examination and patient
// else => ready for create new examination and update patient
export const fetchPatientExist = async (email) => {
    let res;
    try{
        res = await authApi().post(endpoints['get-patient-by-email'], email)
    }catch{
        // could not find patient with email
        return -1;
    }
    return res;
}

export const fetchGetDoctorAvailability = async (date, doctor) => {
    const res = await authApi().post(endpoints['get-doctor-availability'], {date,doctor})
    return res;
}

export const fetchCreateDoctorWorkingTime = async (data) => {
    const res = await authApi().post(endpoints['doctor-availability'], data);
    return res;
}

export const fetchGetPatients = async (userID) => {
    const res = await authApi().get(endpoints['user-patients'](userID))
    return res;
}