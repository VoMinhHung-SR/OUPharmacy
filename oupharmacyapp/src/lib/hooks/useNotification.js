import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { userContext } from "../../App"
import { db } from "../../config/firebase"
import { generateQueryGetNotification } from "../utils/getRecipientNotification"

const useNotification = () => {
    const [user]=useContext(userContext)
    const queryGetNotification = generateQueryGetNotification(10)
    const [isLoading, setIsLoading] = useState(true)
    // const [notificationsSnapshot, notificationsLoading, __error] = useCollection(queryGetNotification)
    const [notifyListContent, setNotifyListContent] = useState([])
    useEffect(() => {
        const getNotifications = async (recipientId) => {
            const queryNotifications = query(
                collection(db, 'notifications'),
                where('recipient_id', '==', recipientId),
                orderBy('sent_at', 'desc')
            );
            const notifyListSnapshot = await getDocs(queryNotifications);
            // notifyListSnapshot.docs.map will return a single-line data
            setNotifyListContent(notifyListSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            setIsLoading(false);
        };
        
        if (user) {
            getNotifications(user.id);
        }
    }, [user?.id]);
    return {
        notifyListContent,
        isLoading
    }
}
export default useNotification