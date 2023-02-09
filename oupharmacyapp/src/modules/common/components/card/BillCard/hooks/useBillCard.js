import { useEffect, useState } from "react"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../../config/sweetAlert2"
import { fetchAddBill, fetchPrescrriptionDetailBillCard } from "../services"

const useBillCard = (prescriptionID) => {
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
                    SuccessfulAlert("Thanh toán thành công", "Ok")
                    setIsLoadingButton(false)
                    callback()
                }
            } catch (err) {
                setIsLoadingButton(false)
                ErrorAlert("Thanh toán thất bại", "Hệ thống xảy ra sự cố, vui lòng thử lại sau.", "OK")
            }
        }
        return ConfirmAlert("Xác nhận tạo hóa đơn cho phiếu khám này","Hành động này sẽ không thể hoàn tác, tiếp tục tạo.","Yes","Cancel",
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