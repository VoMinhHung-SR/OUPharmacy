import { collection, orderBy, query, where } from "firebase/firestore"
import { db } from "../../config/firebase"


export const generateQueryGetMessages = (conversationId) =>
	query(
		collection(db, 'messages'),
		where('conversation_id', '==', conversationId),
		orderBy('sent_at', 'asc')
	)

export const transformMessage = (message) =>
	({
		id: message.id,
		...message.data(), // spread out conversation_id, text,sent_at, user
		sent_at: message.data().sent_at
			? convertFirestoreTimestampToString(message.data().sent_at)
			: null
	})

export const convertFirestoreTimestampToString = (timestamp) =>
	new Date(timestamp.toDate().getTime()).toLocaleString()