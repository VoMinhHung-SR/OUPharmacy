import { authApi, endpoints } from "../../../../config/APIs"

// Sample diagnosisData: {
//     sign: string,
//     diagnosed: string,
//     examination: int,
//     user: int
// }
export const fetchCreateDiagnosis = async (diagnosisData) => {
   const res = await authApi().post(endpoints['diagnosis'], diagnosisData)
   return res;
}