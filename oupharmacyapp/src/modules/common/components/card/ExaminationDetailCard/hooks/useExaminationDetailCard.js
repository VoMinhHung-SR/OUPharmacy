import { useEffect, useState } from "react"
import { fetchDiagnosisByExaminationID, fetchPrescribingByDiagnosis } from "../../../../../pages/PaymentComponents/services"
import { fetchPrescrriptionDetailBillCard } from "../../BillCard/services"

const useExaminationDetailCard = (examinationID) => {
   const [diagnosis , setDiagnosis] = useState([])
   const [prescbring, setPrescribing] = useState([])
   const [bill, setBill] = useState([])
   const [isLoading, setIsLoading] = useState(true)
   useEffect(()=> {
    const loadDiagnosis = async (examinationID) => {
        try{
            // Load Diagnosis
            const res = await fetchDiagnosisByExaminationID(examinationID)
            if(res.status === 200){
                setDiagnosis(res.data)

                // Load Prescribing
                const res2 = loadPrescribing(res.data.id)
                if(res2.status === 200){
                    setPrescribing(res2.data)

                    // Load Bill
                    const res3 = res2.data.map(prescbring => loadBill(prescbring.id))
                    if(res3.status === 200){
                        console.log(OKE)
                    }
                }

            }
        }catch(err){
            const res = err.response
            if(res.status === 500)
                console.log(err)
        }
    }

    const loadPrescribing = async (diagnosedID) => {
        try{
            const res = await fetchPrescribingByDiagnosis(diagnosedID)
            if(res.status === 200){
                setPrescribing(res.data)
            }
        }catch(err){
            const res = err.response
            if(res.status === 500)
                console.log(err)
        }
    }

    const loadBill = async (prescbringID) => {
        try{
            const res = await fetchPrescrriptionDetailBillCard(prescbringID)
            if(res.status === 200){
                setBill(prevState => [...prevState, res.data])
            }
        }catch(err){
            const res = err.response
            if(res.status === 500)
                console.log(err)
        }
    }

    if(examinationID){
        loadDiagnosis(examinationID)
        setIsLoading(false)
    }
   }, [])

    return {
        isLoading,
        diagnosis, bill, 
        prescbring
    }
}

export default useExaminationDetailCard