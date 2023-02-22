import { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { userContext } from "../../../../App"
import SuccessfulAlert, { ConfirmAlert, ErrorAlert } from "../../../../config/sweetAlert2"
import { fetchDeleteAnExamination, fetchExaminationList } from "../services"

const useExaminationList = () => {
    const [user] = useContext(userContext)
    const [isLoading, setIsLoading] = useState(true)
    const [flag, setFlag] = useState(false)
    const [examinationList, setExaminationList] = useState([])

    const {t} = useTranslation(['examinations','modal'])
   

    useEffect(()=> {
        const loadExaminations = async (userID) =>{
            try{
                const res = await fetchExaminationList(userID)
                if (res.status === 200) {
                    setExaminationList(res.data)
                    setIsLoading(false)
                    console.log(res.data)
                }
            }catch (err) {
                setIsLoading(false)
                setExaminationList([])
            }
            
        }
        if(user){
            loadExaminations(user.id)
        }
    }, [user, flag])

    const handleDeleteExamination = (examinationID) =>{

        const deleteExamination = async () =>{
            const res = await fetchDeleteAnExamination(examinationID)
            if (res.status === 204){
                SuccessfulAlert(t('modal:deleteCompleted'), t('modal:ok'))
                setFlag(!flag)
            }else{
                ErrorAlert(t('modal:deleteFailed'), t('modal:errSomethingWentWrong'), t('modal:ok'))
            }
        }
        return ConfirmAlert(t('examinations:confirmDelete'),t('modal:noThrowBack'),
        t('modal:yes'),
        t('modal:cancel'),
        // this is callback function when user confirmed "Yes"
        ()=>{
            deleteExamination()
        }, ()=> {return;})
    }

    return {
        examinationList,
        isLoading,
        setExaminationList,
        handleDeleteExamination,
        
    }
}

export default useExaminationList