import { authApi, endpoints } from "../../../../../config/APIs"

export const fetchCreateOrUpdatePatient = async (patientId = -1, patientData) => {
    // Update when patientID !== -1
    if(patientId !== -1 ){
        console.log("patch")
        const res = await authApi().patch(endpoints['patient-detail'](patientId), patientData)
        return res;
    }
    // Create New Patient
    console.log("post")
    const res = await authApi().post(endpoints['patient'], patientData)
    return res;
}

export const featchCreateExamination = async (examinationData) => {
    const res = await authApi().post(endpoints['examination'], examinationData)
    return res;
}