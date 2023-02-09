import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { userContext } from "../../../../App"
import { fetchPrescriptionByExaminationID, fetchReciept } from "../services"

const usePayment = () => {
    const [user] = useContext(userContext)
    const examinationID = useParams()
    const [isLoadingPrescriptionDetail, setIsloadingPrescriptionDetail] = useState(true)
    const [examinationDetail, setExaminationDetail] = useState([])
    const [flag, setFlag] = useState(false)
    const [receipt, setReceipt] = useState(false)

    const handleChangeFlag = () => {
        setFlag(!flag)
    }

    useEffect(()=>{
        const loadPrescription = async () => {
            try {
                console.log(examinationID)
                const res = await fetchPrescriptionByExaminationID(examinationID.examinationId)
                if (res.status === 200) {
                    setExaminationDetail(res.data)
                    setIsloadingPrescriptionDetail(false)
                    loadReceipt(res.data.id)
                    console.log(res.data)
                }
            } catch (err) {
                setIsloadingPrescriptionDetail(false)
                setExaminationDetail([])
                console.log(err)
            }
        }

        const loadReceipt = async (prescriptionId) => {
            try {
                const res = await fetchReciept(prescriptionId)
                if (res.status === 200) {
                    setReceipt(true)
                    console.log(res.data)
                }
            } catch (err) {
                if(err.status === 500)
                    setReceipt(false)
            }
        }
        if(user){
            loadPrescription()
        }
    },[flag, examinationID])

    return{
        receipt,
        isLoadingPrescriptionDetail,
        user,
        examinationDetail,
        examinationID,
        handleChangeFlag
    }
}
export default usePayment