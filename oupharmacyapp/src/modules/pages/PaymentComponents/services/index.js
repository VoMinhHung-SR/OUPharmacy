import { authApi, endpoints } from "../../../../config/APIs"

export const fetchPrescriptionByExaminationID = async (examinationID) => {
    const res = await authApi().get(endpoints['get-prescription-by-examinationId'](examinationID))
    return res;
}
export const fetchReciept = async (prescriptionID) =>{
    const res = await authApi().post(endpoints['receipt'],{
        prescription: parseInt(prescriptionID)
    });
    return res;
}