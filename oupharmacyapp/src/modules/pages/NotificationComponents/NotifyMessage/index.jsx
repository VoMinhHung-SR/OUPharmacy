import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Loading from "../../../common/components/Loading"

const NotifyMessage = ({content, recipientId, examinationId, sentAt}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                    {examinationId}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={content} />
            </ListItemButton>
          </ListItem>
    )
}
export default NotifyMessage;