import { authApi, endpoints } from "../../../../config/APIs"

export const fetchDiagnosisList = async () => {
    const res = await authApi().get(endpoints['diagnosis'])
    return res;
 }