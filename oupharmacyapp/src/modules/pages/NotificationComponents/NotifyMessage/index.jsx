import { Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import moment from "moment";
import { useTranslation } from "react-i18next";
import { STATUS_BOOKING_CONFIRMED, STATUS_BOOKING_DONE } from "../../../../lib/constants";
import { convertFirestoreTimestampToString } from "../../../../lib/utils/getMessagesInConversation";

const NotifyMessage = ({content, recipientId, examinationId, sentAt, avatar}) => {
    const {t} = useTranslation(['common'])
    console.log(convertFirestoreTimestampToString(sentAt))
    return (
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar sx={{ width: 32, height: 32 }} src={avatar ? avatar : 'None' }/>
              </ListItemIcon>
      
              <ListItemText >
              <Typography component="div" className="ou-list-item-text-container " style={{ maxHeight: '70px'}}>
                {content === STATUS_BOOKING_CONFIRMED ? t('common:notifyExaminationConfirm') : content === STATUS_BOOKING_DONE ? "DONE" : <></>}
              </Typography>
              <Typography component="div" style={{ maxHeight: '70px'}}>
                <span className="ou-text-[12px]" >
                  {sentAt ? moment(convertFirestoreTimestampToString(sentAt)).fromNow()  : <></>}
                </span>
              </Typography>
              </ListItemText>
                {/* // className="ou-break-words "
                // primary={
                //   content === STATUS_BOOKING_CONFIRMED ? (<Typography> {t('common:notifyExaminationConfirm')}</Typography> ):
                //   content === STATUS_BOOKING_DONE ? "DONE" : <></>
                // } /> */}
            </ListItemButton>
          </ListItem>
    )
}
export default NotifyMessage;