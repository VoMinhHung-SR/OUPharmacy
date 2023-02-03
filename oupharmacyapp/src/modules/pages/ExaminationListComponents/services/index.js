import  { authApi, endpoints } from "../../../../config/APIs"

export const fetchExaminationList = async (userID) =>{
    const res = await authApi().get(endpoints['booking-list'](userID))
    return res
}
export const fetchDeleteAnExamination = async (examinationID) =>{
    const res = await authApi().delete(endpoints['examination-detail'](examinationID))
    return res
}