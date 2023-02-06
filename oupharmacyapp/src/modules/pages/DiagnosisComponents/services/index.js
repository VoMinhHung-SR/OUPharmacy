import { authApi, endpoints } from "../../../../config/APIs"

// Sample PrescriptionData: {
//     sign: string,
//     diagnosed: string,
//     examination: int,
//     user: int
// }
export const fetchCreateDiagnosis = async (prescriptionData) => {
   const res = await authApi().post(endpoints['prescriptions'], prescriptionData)
   return res;
}