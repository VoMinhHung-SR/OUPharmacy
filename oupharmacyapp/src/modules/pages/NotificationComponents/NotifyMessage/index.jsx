import { Avatar, Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Loading from "../../../common/components/Loading"

const NotifyMessage = ({content, recipientId, examinationId, sentAt, avatar}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar sx={{ width: 32, height: 32 }} src={avatar ? avatar : 'None' }/>
                    {/* {examinationId} */}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={content} />
            </ListItemButton>
          </ListItem>
    )
}
export default NotifyMessage;