import { useEffect, useState } from "react"
import { generateQueryGetExamsListPerDay } from "../services";
import moment from "moment";

const useWaitingRoom = () => {
    const [exams, setExams] = useState([]);
    const todayStr = new Date().toLocaleDateString();
    const today = moment(todayStr).format('YYYY-MM-DD');
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchExams = async () => {
            try {
              const fetchedExams = await generateQueryGetExamsListPerDay(today);
              setExams(fetchedExams);
            } catch (error) {
              console.log('Error getting documents: ', error);
            }
        }
  
      fetchExams();
    }, [today]);

    return {
        exams
    }
}

export default useWaitingRoom