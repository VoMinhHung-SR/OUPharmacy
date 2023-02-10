import { Box, Button, Container, Grid, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { Outlet, useNavigate, useParams } from "react-router"
import useConversationList from "../../modules/pages/ConversationListComponents/hooks/useConversationList"
import SidebarInbox from "../../modules/pages/ConversationListComponents/SidebarInbox"

const ConversationList = () => {
    const {user} = useConversationList()
    const {conversationId, recipientId} = useParams()
    const router = useNavigate()
    // console.log(conversationId)
    if (user === null || user === undefined) {
        return (
            <>
                <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4> Bạn phải đăng nhập để sử dụng cuộc trò chuyện</h4>
                            <Button onClick={() => { router('/login') }}>Tại đây!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )
    }

     return (
        <>
            <div>
                <Container style={{ "padding": "30px 0px" }} >
                    <Box sx={{ bgcolor: "background.paper", width: "100%", boxShadow: 3, display: "flex" }} minHeight={"600px"}>
                        <Box xs={4} md={4} sm={12} width={"30%"} >
                            <SidebarInbox user={user}/>
                        </Box>

                        <Box xs={8} md={8} sm={12} width={"70%"}>
                            {(conversationId && recipientId) ? 
                                <Outlet /> :  
                                <Grid item sx={{ backgroundColor: "lightGray" }} height={"600px"}>
                                    <Box square style={{ "backgroundColor": "#333" }}>
                                        <ListItem>
                                            <ListItemText primary={"Chọn người dùng thực hiện chat"} style={{ "color": "white" }} />
                                        </ListItem>
                                    </Box>
                                </Grid>
                            }
                            
                           

                            {/* <Box height={"60px"}>
                                <FormControl fullWidth  variant="filled">
                                    
                                    <OutlinedInput
                                        id="adornment-amount"
                                        className="m-2"
                                        multiline
                                        placeholder="Nhập tin nhắn..."
                                        rows={2}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <SendIcon style={{cursor:"pointer"}}/>
                                        </InputAdornment>}
                                    />
                                </FormControl>
                            </Box> */}
                        </Box>


                    </Box>
                </Container>
            </div>

        </>
    );
}
export default ConversationList