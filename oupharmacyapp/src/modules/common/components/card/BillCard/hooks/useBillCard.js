import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../../config/sweetAlert2"
import { fetchAddBill, fetchPrescrriptionDetailBillCard } from "../services"

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
    return {
        prescriptionDetail,isLoadingPrescriptionDetail,
        onSubmit, isLoadingButton
    }
}
export default useBillCard