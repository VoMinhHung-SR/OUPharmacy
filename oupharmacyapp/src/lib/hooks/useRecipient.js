import { collection, query, where } from "firebase/firestore";
import { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { userContext } from "../../App";
import { db } from "../../config/firebase";
import { getRecipientId } from "../utils/helper";

const useRecipient = (members) => {
    const [user] = useContext(userContext);
    // get ID
    const recipientId = getRecipientId(members, user.id)

    // get Avatar
    const queryGetRecipient = query(collection(db, 'users'),
        where('id', '==', getRecipientId(members, user.id))
    )

    const [recipientsSnapshot, __error] = useCollection(queryGetRecipient)

    // recipientSnapshot?.docs could be an empty array, leading to docs[0] being undefined
    // so we have to force "?" after docs[0] because there is no data() on "undefined"
    const recipient = recipientsSnapshot?.docs[0]?.data() | undefined

    return {
        recipient,
        recipientId
    }
}
export default useRecipient