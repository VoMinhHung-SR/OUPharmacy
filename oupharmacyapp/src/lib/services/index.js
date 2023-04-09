
export const sendReminderEmail = async (examID) => {
    let res;
    try{
      res = await APIs.post(endpoints['send-email-remind1'](examID))
      if(res.status === 200)
        console.log("Sent email")
    }catch(err){
        console.log(err)
        console.log("cant send email")
    }  
    return res;
};

