import { authApi, endpoints } from "../../../../../../config/APIs"

export const fetchMedicinesUnit = async () =>{
    const res = await authApi().get(endpoints['medicine-units'])
    return res;
}
export const fetchCreatePrescribing = async (prescribingData) =>{
    const res = await authApi().post(endpoints['prescribing'],prescribingData)
    return res
}
export const fetchAddPrescriptionDetail = async (data) => {
    const res = await authApi().post(endpoints['prescription-detail'], data)
    return res;
}