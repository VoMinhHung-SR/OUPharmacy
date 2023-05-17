import { doc, getDoc, updateDoc } from "firebase/firestore";
import APIs, { endpoints } from "../../config/APIs";
import { db } from "../../config/firebase";
import { getDirections } from "../utils/getDirections";
import moment from "moment";
import { keyUpdateExam } from "../utils/helper";
import { APP_ENV } from "../constants";


export const sendReminderEmail = async (examID, seconds) => {
    let res;
    try{
      res = await APIs.post(endpoints['send-email-remind1'](examID), {seconds})
      if(res.status === 200)
        console.log("Sent email")
    }catch(err){
        console.log(err)
        console.log("cant send email")
    }  
    return res;
};


export const loadDistanceFromUser = async (lat, lng) => {
    try{
        const res = await getDirections(lat, lng)
        if(res.status === 200)
            return {distance: res.data.routes[0].legs[0].distance.text, 
                duration: res.data.routes[0].legs[0].duration.value}
        else {
            return {distance: "", duration: ""}
        }
    }catch(err)
    {
        console.log(err)
        return {distance: "", duration: ""}
    }
}


// const examFakeData = [{
//     examID: 26,
//     duration: 121,
//     author: "abc@gmail.com",
//     distance: "1.09 km",
//     isCommitted: false,
//     remindStatus: false,
//     startedDate: 1652135700000
//   }];
export const handleSendRemindEmail = async () => {
    const currentTime = Date.now();
    const today = moment().format('YYYY-MM-DD');
    const waitingRoomRef = doc(db, `${APP_ENV}_waiting-room`, today);
  
    try {
      const docSnap = await getDoc(waitingRoomRef);
      if (docSnap.exists()) {
        const exams = docSnap.data().exams;
        for (const exam of exams) {
          const examStartTime = exam.startedDate.toDate().getTime();
          const examEndTime = examStartTime + exam.duration * 1000;
  
          if (currentTime + 60 * 1000 >= examEndTime && !exam.remindStatus) {
            await sendReminderEmail(exam.examID, exam.duration);
            console.log(`Reminder email sent for exam ${exam.examID}.`);

            // Update the exam document to set remindStatus to true
            await keyUpdateExam(exam.examID, 'remindStatus', true);

            console.log(`Exam ${exam.examID} updated with remindStatus=true.`);
          }
        }
      } else {
        console.log('No document exists for today.');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };