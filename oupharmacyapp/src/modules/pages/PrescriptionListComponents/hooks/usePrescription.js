import { useContext, useEffect, useState } from "react"
import { userContext } from "../../../../App"
import { fetchDiagnosisList } from "../services"
import { useSearchParams } from "react-router-dom"

const usePrescriptionList = () =>{
    const [user] = useContext(userContext)
    const [prescriptionList, setPrescriptionList] = useState([])
    const [isLoadingPrescriptionList, setIsLoadingPrescriptionList] = useState(true);
    
    // ====== QuerySet ======
    const [q] = useSearchParams();
    const [flag, setFlag] = useState(false)
    const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
    const [page, setPage] = useState(1);
    
    const handleChangePage = (event, value) => {
        setIsLoading(true)
        setPage(value)
    };


    useEffect(()=>{
        const loadPrescriptionList = async () =>{
            try {

                let query = q.toString();
                
                let querySample = query 
                querySample === "" ? (querySample += `page=${page}`): 

                (querySample += `&page=${page}`);

                const res = await fetchDiagnosisList(querySample);
                if (res.status === 200) {
                    const data = await res.data;
                    console.log(data)
                    setPrescriptionList(data.results);
                    setPagination({
                        count: data.count,
                        sizeNumber: Math.ceil(data.count / 10),
                    });
                }
            } catch (err) {
                setPrescriptionList([]);
                console.log(err);
            } finally {
                setIsLoadingPrescriptionList(false);
                
            }
        }
        if(user){
            loadPrescriptionList();
        }
    },[user, flag, page])
    return {
        isLoadingPrescriptionList,
        prescriptionList,
        user,  handleChangePage, pagination, page    
    }
}
export default usePrescriptionList