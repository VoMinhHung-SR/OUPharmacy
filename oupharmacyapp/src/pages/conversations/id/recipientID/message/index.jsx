import { Avatar, Box, FormControl, Grid, InputAdornment, ListItem, ListItemAvatar, ListItemText, OutlinedInput } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import useChatWindow from "../../../../../modules/pages/ChatWindowComponents/hooks/useChatWindow";
import MessageCard from "../../../../../modules/common/components/card/MessageCard";
import { transformMessage } from "../../../../../lib/utils/getMessagesInConversation";
const ChatWindow = () => {
    const {recipient, messagesLoading, newMessage, setNewMessage, refEndMessage,
        sendMessageOnClick, sendMessageOnEnter, messagesInCoversation, messagesSnapshot} = useChatWindow()

    const renderMessages = () => {
        if (messagesLoading) {
            return messagesInCoversation.map(message => (
                <Box sx={{ p: 1 }}>
                    <MessageCard key={message.id} id={message.id} message={message.text} />
                </Box>

            ))
        }
        // If front-end has finished loading messages, so now we have messagesSnapshot
        if (messagesSnapshot) {
            if(messagesSnapshot.docs.length === 0)
                return (<h1 className="ou-justify-center ou-items-center">Hay nhap gi do de nhan tin</h1>)
            return messagesSnapshot.docs.map(message => (
                <Box sx={{ p: 1 }}>
                    <MessageCard key={message.id} id={message.id} message={transformMessage(message)} />
                </Box>
            ))
        }
        return null
    }

    return (<>
        <Grid item className>
            <Box square className="ou-h-[60px] ou-bg-blue-600">
                <ListItem key={""}>
                    {recipient !== null ?
                        (
                            <>
                                <ListItemAvatar>
                                    <Avatar
                                        alt="Profile Picture"
                                        src={recipient.avatar_path ? recipient.avatar_path : "https://mui.com/static/images/avatar/1.jpg"}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={recipient.email ? recipient.email :
                                    "........"} style={{ "color": "white" }} />
                            </>

                        ) : <>
                            <ListItemAvatar>
                                <Avatar
                                    alt="Profile Picture"
                                    src={"https://mui.com/static/images/avatar/1.jpg"}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={"Mã đoạn chat " + conversationId} style={{ "color": "white" }} />
                        </>}
                    
                </ListItem>
            </Box>
            <Box id="chat-window" sx={{ backgroundColor: "lightGray", overflowY: "auto" }} height={"460px"}>
                {renderMessages()}
                <div ref={refEndMessage}/>
            </Box>
            
            <Box height={"60px"}>
                <FormControl fullWidth variant="filled">
                    <OutlinedInput
                        id="adornment-amount"
                        className="m-2"
                        multiline
                        placeholder="Nhập tin nhắn..."
                        value={newMessage}
                        onChange={event => setNewMessage(event.target.value)}
                        onKeyDown={sendMessageOnEnter}
                        rows={2}
                        endAdornment={
                            <InputAdornment position="end">
                                <SendIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={sendMessageOnClick}
                                    disabled={!newMessage}
                                />
                            </InputAdornment>}
                    />
                </FormControl>
            </Box>
        </Grid>

    </>)
}
export default ChatWindow

