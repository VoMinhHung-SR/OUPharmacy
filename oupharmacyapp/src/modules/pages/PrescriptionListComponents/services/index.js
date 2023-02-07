import { authApi, endpoints } from "../../../../config/APIs"

export const fetchPrescriptionList = async () => {
    const res = await authApi().get(endpoints['prescriptions'])
    return res;
 }