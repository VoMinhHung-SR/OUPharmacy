import { FieldPath, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { db } from "../../config/firebase"

// it will return a user Id (recipient message in room chat) not current user
export const getRecipientId = (member ,currentUserId) => member.find(userId => userId !== currentUserId)


export const getListExamToday = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const waitingRoomRef = doc(db, 'waiting-room', today);
  
    try {
      const docSnapshot = await getDoc(waitingRoomRef);
      if (docSnapshot.exists()) {
        const examsArray = docSnapshot.data().exams;
        console.log(examsArray);
        return examsArray;
      } else {
        console.log('No matching documents found.');
        return -1;
      }
    } catch (error) {
      console.log('Error getting documents: ', error);
      return -1;
    }
  };
  
export const setListExamToday = async (examData) => {
    const today = new Date().toISOString().slice(0, 10);
    // Create a reference to the document with ID set to today's date
    const waitingRoomRef = doc(db, 'waiting-room', today);
    let examList = [];
    if(examData.length !== 0){
        examData.map((exam, index) => {

            const startedDate = new Date();
            startedDate.setHours(7, 0, 0, 0); // Set to 7AM
            startedDate.setMinutes(startedDate.getMinutes() + index * 20); // Add 20 minutes for each index

            const data = {
                emailRemind: false,
                isCommitted: false,
                examID: exam.id,
                author: exam.user.email,
                startedDate
            }

            examList.push(data);
        })
        try {
            await setDoc(waitingRoomRef, {exams: examList}, { merge: true });
            console.log('Document saved successfully!');
          } catch (error) {
            console.error('Error saving document:', error);
        }
    }

}