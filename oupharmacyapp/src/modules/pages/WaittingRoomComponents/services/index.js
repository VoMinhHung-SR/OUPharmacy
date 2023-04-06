import { doc, onSnapshot } from "firebase/firestore";
import APIs, { endpoints } from "../../../../config/APIs"
import { db } from "../../../../config/firebase";

export const fetchListExaminationToday = async () => {
    const res = await APIs.get(endpoints['get-list-exam-today'])
    return res;
}


export const generateQueryGetExamsListPerDay = (today) => {
    const todayStr = today.toLocaleDateString();
    const waitingRoomRef = doc(db, 'waiting-room', todayStr);
  
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(waitingRoomRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const examsArray = docSnapshot.data().exams;
          resolve(examsArray);
        } else {
          console.log('No matching documents found.');
          resolve([]);
        }
      }, (error) => {
        console.log('Error getting documents: ', error);
        reject([]);
      });
  
      return () => unsubscribe();
    });
  }