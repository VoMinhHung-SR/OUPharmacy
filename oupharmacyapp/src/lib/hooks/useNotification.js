import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore"
import { useMemo } from "react"
import { useCallback, useContext, useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { userContext } from "../../App"
import { db } from "../../config/firebase"
import { generateQueryGetNotification } from "../utils/getRecipientNotification"

const useNotification = () => {
    const [user, userReady] = useContext(userContext)
    const [isLoading, setIsLoading] = useState(true)
    const queryGetNotification = generateQueryGetNotification(user?.id)
    const [notificationsSnapshot, notificationsLoading, __error] = useCollection(queryGetNotification)
    const [notifyListContent, setNotifyListContent] = useState([])
    if(!userReady)
        return {
            notifyListContent,
            isLoading: true
        }
    // if snapshot have data then map to state
    useEffect(()=> {
        try{
            if(!notificationsLoading){
                setNotifyListContent(notificationsSnapshot?.docs?.map((doc) => ({ id: doc.id, ...doc.data() })));
            }else {
                if(!notificationsLoading &&notificationsSnapshot?.size === 0)
                    setNotifyListContent([])
            }
        }catch(err){
            console.log(err)
        }
        
    }, [notificationsSnapshot])

    const markAllAsRead = async () => {
        setIsLoading(true);
        try {
          await notificationsSnapshot.docs.forEach((doc) => {
            doc.ref.update({
              is_commit: true,
            });
          });
          setNotifyListContent((prevState) =>
            prevState.map((notification) => ({ ...notification, is_commit: true }))
          );
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

    return {
        notificationsSnapshot: notificationsSnapshot?.docs,
        notifyListContent, markAllAsRead,
        isLoading: notificationsLoading,
    }
}
export default useNotification