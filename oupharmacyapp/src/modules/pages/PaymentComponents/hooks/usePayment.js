import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { userContext } from "../../../../App"
import { fetchDiagnosisByExaminationID, fetchPrescribingByDiagnosis } from "../services"

const usePayment = () => {
    const [user] = useContext(userContext)
    const {examinationId} = useParams()
    const [isLoadingPrescriptionDetail, setIsloadingPrescriptionDetail] = useState(true)
    const [examinationDetail, setExaminationDetail] = useState([])

    const [prescribing, setPrecribing] = useState([])

    useEffect(()=>{
        const loadDiagnosis = async () => {
            try {
                const res = await fetchDiagnosisByExaminationID(examinationId)
                if (res.status === 200) {
                    setExaminationDetail(res.data)
                    setIsloadingPrescriptionDetail(false)
                    loadPrescribings(res.data.id)
                    console.log(res.data)
                }
            } catch (err) {
                setIsloadingPrescriptionDetail(false)
                setExaminationDetail([])
                console.log(err)
            }
        }
        const loadPrescribings = async (diagnosisId) => {
            try {
                const res = await fetchPrescribingByDiagnosis(diagnosisId)
                if (res.status === 200) {
                    setPrecribing(res.data)
                    console.log(res.data)
                }
            } catch (err) {
                if(err.status === 500)
                    setPrecribing([])
            }
        }
        if(user){
            loadDiagnosis()
        }
    },[ examinationId])
    return{
        prescribing,
        isLoadingPrescriptionDetail,
        user,
        examinationDetail,
        examinationId,
    }
}
export default usePayment