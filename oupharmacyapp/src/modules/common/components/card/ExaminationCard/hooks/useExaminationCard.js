import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { db } from "../../../../../../config/firebase"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../../../config/sweetAlert2"
import { STATUS_BOOKING_CONFIRMED } from "../../../../../../lib/constants"
import { fetchSendEmailConfirmExamination } from "../services"

const useExaminationCard = () =>{
    const {t} = useTranslation(['examinations','modal'])
    

    // const [flag, setFlag] = useState(false)
    const [isLoadingButton, setIsLoadingButton] = useState(false)

    const handleSendEmailConfirm = (userID, examinationID, avatar, callback)=>{
        const sendEmail = async ()=>{
            console.log(userID)
            const res = await fetchSendEmailConfirmExamination(examinationID)
            if (res.status === 200){
                callback()
                createNotificationRealtime(userID, examinationID, avatar)
                SuccessfulAlert(t('sendMailSuccessed'), t('modal:oke'))
            }else 
                if (res.status === 400){ 
                    callback()
                    ErrorAlert(t('modal:errSomethingWentWrong'),t('modal:pleaseTryAgain'), t('modal:ok'))
                } 
            setIsLoadingButton(false)
        }
        return ConfirmAlert(t('confirmSendEmail'),t('modal:noThrowBack'),t('modal:yes'),t('modal:cancel'),
            // this is callback function when user confirmed "Yes"
            ()=>{
                setIsLoadingButton(true)
                sendEmail()
        },()=>{return;})
    }

    const createNotificationRealtime  = async (userID, examinationID, avatar) => {
        try{
            await setDoc(doc(db,"notifications", examinationID.toString()),{
                "is_commit": false,
                "booking_id": examinationID,
                'content': STATUS_BOOKING_CONFIRMED,
                "recipient_id": userID,
                "avatar": avatar,
                "sent_at" : serverTimestamp()
            },{merge:true})
        }catch(err){
            console.log(err)
            ErrorAlert("Đã có lỗi xảy ra","Vui lòng quay lại sau", "OK")
        }
    }
    return{
        isLoadingButton,
        handleSendEmailConfirm
    }
}
export default useExaminationCard