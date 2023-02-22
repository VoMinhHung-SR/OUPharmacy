import { useContext, useEffect, useState } from "react"
import { userContext } from "../../../../App"
import { fetchDiagnosisList } from "../services"

const usePrescriptionList = () =>{
    const [user] = useContext(userContext)
    const [prescriptionList, setPrescriptionList] = useState([])
    const [isLoadingPrescriptionList, setIsLoadingPrescriptionList] = useState(true);

    useEffect(()=>{
        const loadPrescriptionList = async () =>{
            try {
                const res = await fetchDiagnosisList();
                if (res.status === 200) {
                    setIsLoadingPrescriptionList(false);
                    setPrescriptionList(res.data);
                    console.log(res.data);
                }
            } catch (err) {
                setIsLoadingPrescriptionList(false);
                setPrescriptionList([]);
                console.log(err);
            }
        }
        if(user){
            loadPrescriptionList();
        }
    },[user])
    return {
        isLoadingPrescriptionList,
        prescriptionList,
        user    
    }
}
export default usePrescriptionList