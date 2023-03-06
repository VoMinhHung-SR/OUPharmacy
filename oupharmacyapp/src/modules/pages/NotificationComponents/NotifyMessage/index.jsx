import { Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import { useTranslation } from "react-i18next";
import { STATUS_BOOKING_CONFIRMED, STATUS_BOOKING_DONE } from "../../../../lib/constants";

const NotifyMessage = ({content, recipientId, examinationId, sentAt, avatar}) => {
    const {t} = useTranslation(['common'])
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