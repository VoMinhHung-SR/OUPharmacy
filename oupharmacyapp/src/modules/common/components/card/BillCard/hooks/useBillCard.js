import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../../config/sweetAlert2"
import { fetchAddBill, fetchMomoPaymentURL, fetchPrescrriptionDetailBillCard } from "../services"

const useBillCard = (prescriptionID) => {
    const {t} = useTranslation(['payment','modal'])
    const [isLoadingPrescriptionDetail, setIsLoadingPrescriptionDetail] = useState(true)
    const [prescriptionDetail, setPrescriptionDetail] = useState([])
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    useEffect(()=>{
        const loadPrescriptionDetail = async () =>{
            try{
                const res = await fetchPrescrriptionDetailBillCard(prescriptionID)
                if (res.status === 200){
                    setIsLoadingPrescriptionDetail(false)
                    setPrescriptionDetail(res.data)
                }
            }catch(err){
                setIsLoadingPrescriptionDetail(false)
                setPrescriptionDetail([])
            }
        }
        if(prescriptionID)
            loadPrescriptionDetail()
    },[prescriptionID])
    const onSubmit = (amount, prescriptionID, callback) => {
        const handleOnSubmit = async () => {
            try {
                const res = await fetchAddBill({amount: amount, prescriptionId: prescriptionID})
                if (res.status === 201) {
                    SuccessfulAlert(t('payCompleled'), t('modal:ok'))
                    setIsLoadingButton(false)
                    callback()
                }
            } catch (err) {
                setIsLoadingButton(false)
                ErrorAlert(t('payFailed'), t('modal:errSomethingWentWrong'), t('modal:ok'))
            }
        }
        return ConfirmAlert(t('confirmCreateBill'),t('modal:noThrowBack'),t('modal:yes'),t('modal:cancel'),
        // this is callback function when user confirmed "Yes"
        ()=>{
            setIsLoadingButton(true)
            handleOnSubmit()
        }, () => { return; })
    }

    const momoPayment = (amount, prescriptionID) =>{
        const addBill = async () => {
            try {
                const res = await fetchMomoPaymentURL({amount: amount, prescriptionId: prescriptionID})
                if (res.status === 200) {
                    // console.log(res.data.payUrl)
                    window.location.replace(res.data.payUrl);
                }
            } catch (err) {
                ErrorAlert("Thêm thất bại", "", "OK")
            }
        }
        return ConfirmAlert(t('confirmCreateBill'),t('modal:noThrowBack'),t('modal:yes'),t('modal:cancel'),
        // this is callback function when user confirmed "Yes"
        ()=>{
            addBill()
        }, () => { return; })
    }

    return {
        prescriptionDetail,isLoadingPrescriptionDetail,
        onSubmit, isLoadingButton, momoPayment
    }

}
export default useBillCard