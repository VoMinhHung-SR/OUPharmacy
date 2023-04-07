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
  // const query = useMemo(() => generateQueryGetWaitingRoomListToday(today), [today]);
  // const [waitingRoomSnapShot, waitingRoomLoading, error] = useCollection(query);

  // useEffect(() => {
  //   if (!waitingRoomLoading && waitingRoomSnapShot) {
  //     const newExams = waitingRoomSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data().exams }));
  //     setExams(newExams);
  //   } else {
  //     setExams([]);
  //   }
  // }, [waitingRoomLoading, waitingRoomSnapShot]);

  useEffect(() => {

    const unsubscribe = onSnapshot(doc(db, 'waiting-room', today), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const examsArray = docSnapshot.data().exams;
        setExams(examsArray);
      } else {
        console.log('No matching documents found.');
        setExams([]);
      }
    }, (error) => {
      console.log('Error getting documents: ', error);
      setExams([]);
    });

    return () => unsubscribe();

  }, [today]);


  return { exams, isLoading: !exams.length };
};

export default useWaitingRoom;