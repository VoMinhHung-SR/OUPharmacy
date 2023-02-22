import { authApi, endpoints } from "../../../../config/APIs"

// To: create diagnosis sheet
export const fetchCreateDiagnosis = async (diagnosisData) => {
   // Sample diagnosisData: {
   //     sign: string,
   //     diagnosed: string,
   //     examination: int,
   //     user: int
   // }
   const res = await authApi().post(endpoints['diagnosis'], diagnosisData)
   return res;
}