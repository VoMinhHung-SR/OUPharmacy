import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useContext, useEffect } from "react"
import { userContext } from "../../../../App"
import { db } from "../../../../config/firebase";
import { ErrorAlert } from "../../../../config/sweetAlert2";

const useConversationList = () => {
    const [user] = useContext(userContext);
    useEffect(()=>{
        const setUserDB = async ()=>{    
            try{
                await setDoc(doc(db,"users", user.id.toString()),{
                    "id": user.id,
                    "email": user.email,
                    "fullName": user.first_name +" "+ user.last_name,
                    "avatar": user.avatar_path,
                    "lastSeen" : serverTimestamp() 
                },{merge:true})
            }catch(err){
                console.log(err)
                ErrorAlert("Đã có lỗi xảy ra","Vui lòng quay lại sau", "OK")
            }
        }
        if(user){
            setUserDB()
        }
    },[user])
    return {
        user
    }
}
export default useConversationList