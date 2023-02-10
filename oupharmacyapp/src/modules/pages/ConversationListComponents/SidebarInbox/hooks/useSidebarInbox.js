import { addDoc, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../../../../config/firebase";
import SuccessfulAlert, { ErrorAlert } from "../../../../../config/sweetAlert2";
import { fetchRecipients } from "../services";
import { useCollection } from "react-firebase-hooks/firestore"
const useSidebarInbox = (user) => {
    const [isLoadingRecipients, setIsLoadingRecipients] = useState(true)
    const [name, setName] = useState('')
    // ====== QuerySet ======
    const [q] = useSearchParams();
    const [pagination, setPagination] = useState({ count: 0, sizeNumber: 0 });
    const [page, setPage] = useState(1);
    const [recipients, setRecipients] = useState([])


    useEffect(() => {
        const loadName = async () => {
            try {
                let query = q.toString();

                query === "" ? (query += `page=${page}&kw=${name}`) : (query += `&page=${page}&kw=${name}`);
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
    }, [user, name])

    // check a conversation already exists
    const queryGetConversationsForCurrentUser = query(
        collection(db, 'conversations'),
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
            await addDoc(collection(db, 'conversations'), {
                members: [user.id, userId]
            })
            SuccessfulAlert("Thêm cuộc trò chuyện thành công", "OK")
        } else {
            ErrorAlert("Không thể tạo mới", "", "OK")
        }
    }

    return {
        name,isLoadingRecipients, conversationsSnapshot,
        recipients,pagination,
        createNewConversation
    }
}
export default useSidebarInbox 