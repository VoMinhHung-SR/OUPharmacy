import { useEffect, useMemo, useState } from "react"
import { generateQueryGetExamsListPerDay } from "../services";
import moment from "moment";
import { CURRENT_DATE } from "../../../../lib/constants";
import { useCollection } from "react-firebase-hooks/firestore";
import { generateQueryGetWaitingRoomListToday } from "../utils/helpers";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase";

const useWaitingRoom = () => {
  const [exams, setExams] = useState([]);
  const todayStr = new Date().toLocaleDateString();
  const today = moment(todayStr).format('YYYY-MM-DD');
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {

    const unsubscribe = onSnapshot(doc(db, 'waiting-room', today), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const examsArray = docSnapshot.data().exams;
        setExams(examsArray);
      } else {
        console.log('No matching documents found.');
        setExams([]);
      }

      setIsLoading(false)
    }, (error) => {
      console.log('Error getting documents: ', error);
      setIsLoading(false)
      setExams([]);
    });

    return () => unsubscribe();

  }, [today]);


  return { exams, isLoading };
};

export default useWaitingRoom;