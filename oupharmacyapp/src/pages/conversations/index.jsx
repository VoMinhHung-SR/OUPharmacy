import { Box, Container, Grid, ListItem, ListItemText } from "@mui/material"
import { Outlet, useParams } from "react-router"
import useConversationList from "../../modules/pages/ConversationListComponents/hooks/useConversationList"
import SidebarInbox from "../../modules/pages/ConversationListComponents/SidebarInbox"

const ConversationList = () => {
    const {user} = useConversationList()
    const {conversationId, recipientId} = useParams()

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
                        </Box>
                    </Box>
                </Container>
            </div>

        </>
    );
}
export default ConversationList