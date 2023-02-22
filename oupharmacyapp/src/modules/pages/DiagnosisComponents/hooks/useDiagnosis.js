import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userContext } from "../../../../App";
import { authApi, endpoints } from "../../../../config/APIs";

const useDiagnosis = () => {
    const { examinationId } = useParams();
    const [user] = useContext(userContext)
    const [examinationDetail, setExaminationDetail] = useState([])
    const [isLoadingExamination, setIsLoadingExamination] = useState(true)
    const [prescriptionId, setPrescriptionId] = useState(-1)
    const [diagnosis, setDiagnosis] = useState({})
    const [flag, setFlag] = useState(false)

    const handleChangeFlag = () => {
        setFlag(!flag)
    }

    useEffect(()=>{
       const loadExaminationDetail = async () => {
            try {
                const res = await authApi().get(endpoints['examination-detail'](examinationId))
                if (res.status === 200) {
                    setIsLoadingExamination(false)
                    setExaminationDetail(res.data)
                }

            } catch (err) {
                if (err.response.status === 404) {
                    setIsLoadingExamination(false)
                    setExaminationDetail([])
                }
            }
       }
       const loadDiagnosis = async () => {
        try {
            const res = await authApi().get(endpoints['get-diagnosis'](examinationId))
            if (res.status === 200) {
                setPrescriptionId(res.data.id)
                setDiagnosis(res.data)
            }
        } catch (err) {
            setPrescriptionId(-1)
            setDiagnosis({
                "sign":"",
                "diagnosed":"",
            })
        }
    }
       if(user){
            loadExaminationDetail()
            loadDiagnosis()
       }
    },[flag,user])

    return{
        user,
        isLoadingExamination,
        examinationDetail,
        examinationId,
        prescriptionId,
        diagnosis,
        handleChangeFlag
    }
}
export default useDiagnosis