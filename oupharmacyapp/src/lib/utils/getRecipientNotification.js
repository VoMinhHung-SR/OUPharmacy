import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

export const generateQueryGetNotification = (recipientId) =>{
	if(!recipientId)		
		return
	return query(
		collection(db, 'notifications'),
		where('recipient_id', '==', recipientId),
		orderBy('sent_at', 'desc')
	);
}
	
	