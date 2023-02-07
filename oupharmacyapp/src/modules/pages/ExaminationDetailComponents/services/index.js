import { authApi, endpoints } from "../../../../config/APIs"

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