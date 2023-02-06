import { useState } from "react"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../../config/sweetAlert2"
import { fetchCreateDiagnosis } from "../../../../../pages/DiagnosisComponents/services"

const usePrescriptionCard = () => {
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const onSubmit = (data, examinationID, userID, callback) =>{
        const handleOnSubmit = async () => {
            try{
                const prescriptionData = {
                    sign: data.sign,
                    diagnosed: data.diagnosed,
                    examination: parseInt(examinationID),
                    user: userID
                }
                const res = await fetchCreateDiagnosis(prescriptionData)
                if (res.status === 201){
                    callback()
                    SuccessfulAlert("Thêm chẩn đoán thành công", "OK")
                }
            }catch(err){
                ErrorAlert("Thêm thất bại", "Vui lòng xem kĩ lại thông tin ở biểu mẫu", "OK")
            }
            setIsLoadingButton(false)
        }
        return ConfirmAlert("Xác nhận tạo phiếu chẩn đoán","Hành động nay sẽ không thể hoàn tác, tiếp tục tạo.","Yes","Cancel",
        // this is callback function when user confirmed "Yes"
        ()=>{
            setIsLoadingButton(true)
            handleOnSubmit()
        })

    }
    return {
        isLoadingButton,
        onSubmit
    }
}
export default usePrescriptionCard