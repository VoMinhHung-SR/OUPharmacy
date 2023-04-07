import { collection, query } from "firebase/firestore";
import { db } from "../../../../config/firebase";

export const generateQueryGetWaitingRoomListToday = (date) =>{
	if(!date)		
		return
	return query(
		collection(db, 'waiting-room',date)
	);
}
	
	