import  APIs, { authApi, endpoints } from "../../../../config/APIs"

// To get array list examination by userID
// [ {examinationObj}, {...} ] 
export const fetchExaminationList = async (userID) =>{
    const res = await authApi().get(endpoints['booking-list'](userID));
    return res;
}

// methods: To delete examinationObj follow the examinationId
export const fetchDeleteAnExamination = async (examinationID) =>{
    const res = await authApi().delete(endpoints['examination-detail'](examinationID));
    return res;
}

