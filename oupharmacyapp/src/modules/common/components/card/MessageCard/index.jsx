import { List, ListItem, ListItemText, Typography } from "@mui/material"
import moment from "moment"
import { useContext } from "react"
import { userContext } from "../../../../../App"

const MessageCard = ({message}) => {
    const [user] = useContext(userContext)
    if (message) {
        return (<>
            {message.user === user.id ?
                (<>
                    <List className="!ou-bg-blue-700" style={{
                        width: '100%', maxWidth: "60%", bgcolor: '#084468',
                        marginLeft: "auto", color: "white"
                    }} key={message.id} id={message.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                secondary={
                                    <>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="white"
                                        >
                                            {message.text ? message.text : ""} -- {' '}
                                            <em>
                                                <span> 
                                                    {message.sent_at}
                                                    {/* <Moment fromNow>{message.send_at ? message.send_at : ""}</Moment> */}
                                                </span>
                                            </em>
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    </List>
                </>)
                : (<>
                    <List sx={{
                        width: '100%', maxWidth: "60%", bgcolor: 'background.paper'
                    }}
                        key={message.id} id={message.id}>
                        <ListItem alignItems="flex-start">
                            {/* <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={props.image} />
                    </ListItemAvatar> */}
                            <ListItemText
                                secondary={
                                    <>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {message.text ? message.text : ""} --
                                            <em>
                                                <span> 
                                                    {moment(message.sent_at).format('DD/MM/YYYY')}
                                                    {/* <Moment fromNow>{message.send_at ? message.send_at : ""}</Moment> */}
                                                </span>
                                            </em>
                                        </Typography>

                                        <Typography>

                                            {/* {editOwnerComment} */}

                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    </List>
                </>)}
        </>)
    }
}
export default MessageCard