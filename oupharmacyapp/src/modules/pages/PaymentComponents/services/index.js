import { authApi, endpoints } from "../../../../config/APIs"

export const fetchDiagnosisByExaminationID = async (examinationID) => {
    const res = await authApi().get(endpoints['get-diagnosis'](examinationID))
    return res;
}
export const fetchReciept = async (prescribingID) =>{
    const res = await authApi().post(endpoints['receipt'],{
        prescribing: parseInt(prescribingID)
    });
    return res;
}
export const fetchPrescribingByDiagnosis = async (diagnosisId) => {
    const res = await authApi().post(endpoints['get-pres-by-diagnosis'], {
        diagnosis: parseInt(diagnosisId)
    });
    return res;
}