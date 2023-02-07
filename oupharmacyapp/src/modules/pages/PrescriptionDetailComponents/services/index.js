import { authApi, endpoints } from "../../../../config/APIs"

export const fetchPrescriptionDetail = async (prescriptionId) => {
    const res = await authApi().get(endpoints['prescription'](prescriptionId));
    return res;
}