import { FieldPath, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../../config/firebase"
import moment from "moment";
import { fetchListExaminationToday } from "../../modules/pages/WaittingRoomComponents/services";

// it will return a user Id (recipient message in room chat) not current user
export const getRecipientId = (member ,currentUserId) => member.find(userId => userId !== currentUserId)

export const getTotalListExamPerDay = async () => {
  try{
    const res = await fetchListExaminationToday() 
    if(res.status === 200)
      return res.data.length()
  }catch(err){
    return -1;
  }
  
}


export const getListExamToday = async () => {
    const todayStr = new Date().toLocaleDateString()
    const today = moment(todayStr).format('YYYY-MM-DD')
    const waitingRoomRef = doc(db, 'waiting-room', today);
  
    try {
      const docSnapshot = await getDoc(waitingRoomRef);
      if (docSnapshot.exists()) {
        const examsArray = docSnapshot.data().exams;
        return examsArray;
      } else {
        console.log('No matching documents found.');
        return [];
      }
    } catch (error) {
      console.log('Error getting documents: ', error);
      return [];
    }
  };

export const setListExamToday = async (examData) => {
    const todayStr = new Date().toLocaleDateString()
    const today = moment(todayStr).format('YYYY-MM-DD')
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


export const updateExamIsCommitted = async (examId) => {
  const todayStr = new Date().toLocaleDateString();
  const today = moment(todayStr).format('YYYY-MM-DD');

  const waitingRoomRef = doc(db, 'waiting-room', today);
  const waitingRoomDoc = await getDoc(waitingRoomRef);

  if (waitingRoomDoc.exists()) {
    const exams = waitingRoomDoc.data().exams;
    const examToUpdate = exams.find(exam => exam.examID === examId);

    if (examToUpdate) {
      const examRef = doc(db, 'exams', examId);
      await updateDoc(examRef, { isCommitted: true });

      const updatedExam = { ...examToUpdate, isCommitted: true };
      const updatedExams = exams.map(exam => exam.examID === examId ? updatedExam : exam);

      await updateDoc(waitingRoomRef, { exams: updatedExams });
    }
  }
}