import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
import { useMemo } from "react"
import { useCallback, useContext, useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { userContext } from "../../App"
import { db } from "../../config/firebase"
import { generateQueryGetNotification } from "../utils/getRecipientNotification"
import { ConfirmAlert } from "../../config/sweetAlert2"
import createToastMessage from "../utils/createToastMessage"
import { APP_ENV, TOAST_ERROR, TOAST_SUCCESS } from "../constants"

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

    const updateNotifications = async (listNotification, action) => {
        setIsLoading(true);
      
        try {
          // Update the is_commit field for each document in Firebase
          await Promise.all(listNotification.map(notification => {
            const { id } = notification;
            if(action === 'mark')
              return updateDoc(doc(db, `${APP_ENV}_notifications`, id.toString()), {
                is_commit: true
              });
              else 
                return updateDoc(doc(db, `${APP_ENV}_notifications`, id.toString()), {
                  is_active: false
                });
          }));
          createToastMessage({message:"thanh conG", type:TOAST_SUCCESS})
        } catch (error) {
          console.error(error);
          createToastMessage({message:"THAT BAI", type:TOAST_ERROR})
        } finally {
          setIsLoading(false);
        }
    };


    return {
        notificationsSnapshot: notificationsSnapshot?.docs,
        notifyListContent, updateNotifications,
        isLoading: notificationsLoading,
    }
}
export default useNotification