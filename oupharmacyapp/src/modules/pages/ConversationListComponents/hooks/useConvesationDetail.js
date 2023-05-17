import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../../../../config/firebase"
import useRecipient from "../../../../lib/hooks/useRecipient"
import { APP_ENV } from "../../../../lib/constants"

const useConversationDetail = (members) => {
    const { recipientId } = useRecipient(members)

    const queryGetRecipient = query(
        collection(db, `${APP_ENV}_users`),
        where('id', '==', recipientId)
    )
    const [docs, loading, error] = useCollection(queryGetRecipient)
    // useEffect(() => {
    //     const loadRecepientHandler = async () => {
    //         const querySnapshot = await getDocs(queryGetRecipient); 
    //         if (querySnapshot.size !== 0) {
    //             const docs = querySnapshot.docs.map(doc => doc.data())
    //         } else {
    //             console.log("snap = 0")
    //         }
    //     }
    //     if (recipientId) {
    //         loadRecepientHandler()
    //         console.log(recipient)
    //         console.log(recipientId)
    //     }

    // }, [recipientId])

    return {
        docs, error, recipientId, loading
    }
}
export default useConversationDetail