import { FieldPath, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "../../config/firebase"
import moment from "moment";
import { fetchListExaminationToday } from "../../modules/pages/WaittingRoomComponents/services";
import axios from "axios";
import APIs, { endpoints } from "../../config/APIs";
import { loadDistanceFromUser } from "../services";

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

export const convertTimestampToDateTime = (timestamp) => {
  // Create a new date object using the Unix timestamp multiplied by 1000 to convert it to milliseconds
    const date = new Date(timestamp * 1000);
    
    // Get the year, month, day, hours, minutes, and seconds from the date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    // Format the date and time as a string and return it
    return ` ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// export const timeUntilExam = (startDateTime) => {
//   const now = new Date();
//   const start = new Date(startDateTime);
//   const diff = Math.floor((start.getTime() - now.getTime()) / 1000);

//   if (diff < 0) {
//     return "The exam has already started";
//   }

//   const minutes = Math.floor(diff / 60);
//   const seconds = diff % 60;

//   return `The exam will start in ${minutes} minutes and ${seconds} seconds`;
// }
export const timeUntilExam = (startDateTime) => {
  if (!startDateTime)
    return;

  const now = new Date();
  const start = new Date(startDateTime);
  const diffInSeconds = Math.floor((start.getTime() - now.getTime()) / 1000);
  
  if (diffInSeconds < 0) {
    return {
      hasStarted: true,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return {
    hasStarted: false,
    hours,
    minutes,
    seconds
  };
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
      for (let i = 0; i < examData.length; i++) {
          const exam = examData[i];
          const startedDate = new Date();
          startedDate.setHours(7, 0, 0, 0); // Set to 7AM
          startedDate.setMinutes(startedDate.getMinutes() + i * 20); // Add 20 minutes for each index

          const {distance, duration} = await loadDistanceFromUser(exam.user.locationGeo.lat, exam.user.locationGeo.lng);

          const data = {
              isCommitted: false,
              remindStatus: false,
              examID: exam.id,
              author: exam.user.email,
              patientFullName: exam.patient.first_name + " " + exam.patient.last_name,
              startedDate,
              distance,
              duration
          };

          examList.push(data);
      }

      try {
          await setDoc(waitingRoomRef, {exams: examList}, { merge: true });
          console.log('Document saved successfully!');
      } catch (error) {
          console.error('Error saving document:', error);
      }
  }
}


export const keyUpdateExam = async (examId, keyUpdate, value) => {
  const todayStr = new Date().toLocaleDateString();
  const today = moment(todayStr).format('YYYY-MM-DD');

  const waitingRoomRef = doc(db, 'waiting-room', today);
  const waitingRoomDoc = await getDoc(waitingRoomRef);

  if (waitingRoomDoc.exists()) {
    const exams = waitingRoomDoc.data().exams;
    const examToUpdate = exams.find(exam => exam.examID === examId);

    if (examToUpdate) {
      const updatedExam = { ...examToUpdate, [keyUpdate]: value };
      const updatedExams = exams.map(exam => exam.examID === examId ? updatedExam : exam);

      await updateDoc(waitingRoomRef, { exams: updatedExams });
    }
  }
}