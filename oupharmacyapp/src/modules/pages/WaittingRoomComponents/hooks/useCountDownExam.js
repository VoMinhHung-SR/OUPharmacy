import { useEffect, useState } from "react"
import { fetchTotalExamination } from "../services"

const useCountDownExam = () => {
    const [total, setTotal] = useState(0)
    useEffect(()=> {
        const loadTotalExamToday = async () =>{
            const res = await fetchTotalExamination();
            if(res.status === 200)
                setTotal(res.data.total)
            if(res.status === 500)
                setTotal(0)
        }
        loadTotalExamToday()
    }, [total])
    return {
        total
    }
}
export default useCountDownExam