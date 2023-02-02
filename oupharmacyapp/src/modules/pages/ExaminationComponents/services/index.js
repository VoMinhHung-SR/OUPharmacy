import { authApi, endpoints } from "../../../../config/APIs"

export const fetchPatientExist = async (email) => {
    const res = await authApi().post(endpoints['get-patient-by-email'], email)
    return res
}