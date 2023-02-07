import APIs, { authApi, endpoints } from "../../../../../config/APIs"

export const fetchSendEmailConfirmExamination = async (examinationID) =>{
    const res = await APIs.post(endpoints['send-mail'](examinationID))
    return res
}
export const fetchExaminationListConfirm = async (query)=>{
    const res = await authApi().get(`${endpoints['examination']}?${query}`)
    return res
}