import { authApi, endpoints } from "../../../../../../config/APIs"

export const fetchPrescrriptionDetailBillCard = async (prescriptionID) => {
    const res = await authApi().get(endpoints['get-prescription-detail-by-prescId'](prescriptionID))
    return res;
}
export const fetchAddBill = async (prescriptionData) => {
    const res = await authApi().post(endpoints['bill'], {
        amount: prescriptionData.amount,
        prescription: prescriptionData.prescriptionId
    })
    return res;
}

export const fetchMomoPaymentURL = async (prescriptionData) => {
    const res = await authApi().post(endpoints['momoPayUrl'],{
        amount: prescriptionData.amount,
        prescription: prescriptionData.prescriptionId
    })
    return res;
}