import { addDoc, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../../../../config/firebase";
import SuccessfulAlert, { ErrorAlert } from "../../../../../config/sweetAlert2";
import { fetchRecipients } from "../services";
import { useCollection } from "react-firebase-hooks/firestore"
import createToastMessage from "../../../../../lib/utils/createToastMessage";
import { APP_ENV, TOAST_ERROR } from "../../../../../lib/constants";
import useDebounce from "../../../../../lib/hooks/useDebounce";
const useSidebarInbox = (user) => {
    const [isLoadingRecipients, setIsLoadingRecipients] = useState(true)
    const [recipientList, setRecipientList] = useState([])

    const [name, setName] = useState('')
    const debouncedSearchValue = useDebounce(name, 500);
    // ====== QuerySet ======
    const [q] = useSearchParams();
    const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
    const [page, setPage] = useState(1);
    const [recipients, setRecipients] = useState([])


    useEffect(() => {
        const loadName = async () => {
            try {
                let query = q.toString();

                query === "" ? (query += `email=${debouncedSearchValue}`) 
                : (query += `&email=${debouncedSearchValue}`);
                let res;
                if (user) {
                    res = await fetchRecipients(query);
                }

                const data = await res.data;
                setRecipients(data)
                setPagination({
                    count: data.count,
                    // data show number: x = 30
                    sizeNumber: Math.ceil(data.count / 30),
                });
                setIsLoadingRecipients(false);
            } catch (err) {
                console.error(err);
                setIsLoadingRecipients(false);
            }

        };
        if(user)
            loadName()
    }, [user, debouncedSearchValue])

    // check a conversation already exists
    const queryGetConversationsForCurrentUser = query(
        collection(db, `${APP_ENV}_conversations`),
        where('members', 'array-contains', user.id)
    )
    const [conversationsSnapshot] = useCollection(queryGetConversationsForCurrentUser)

    const checkConversationExists =  (userId) => {
        // conversation is an array of documents
        conversationsSnapshot?.docs.find(conversation =>
            conversation.data().members.includes(userId)
        )
    }

    const createNewConversation = async (userId) => {
        if (!user)
            return;
        if (user.id !== userId && !checkConversationExists(userId)) {
            await addDoc(collection(db, `${APP_ENV}_conversations`), {
                members: [user.id, userId]
            })
            SuccessfulAlert("Thêm cuộc trò chuyện thành công", "OK")
        } else {
            return createToastMessage({type: TOAST_ERROR, message: "Không thể tạo mới"})
        }
    }

    return {
        name,isLoadingRecipients, conversationsSnapshot,
        recipients,pagination, 
        createNewConversation, name, setName
    }
}
export default useSidebarInbox 