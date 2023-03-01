import { Box, Button, Container, Grid, ListItem, ListItemText } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Outlet, useNavigate, useParams } from "react-router"
import useConversationList from "../../modules/pages/ConversationListComponents/hooks/useConversationList"
import SidebarInbox from "../../modules/pages/ConversationListComponents/SidebarInbox"

const ConversationList = () => {
    const {t} = useTranslation(['common','modal'])
    const {user} = useConversationList()
    const router = useNavigate()
    const {conversationId, recipientId} = useParams()
    if(!user)
        return (
            <>
            <Box  className="ou-relative ou-items-center" sx={{ height: "550px" }}>
                    <Box className='ou-absolute ou-p-5 ou-text-center 
                        ou-flex-col ou-flex ou-justify-center ou-items-center
                        ou-top-0 ou-bottom-0 ou-w-full ou-place-items-center'>
                        <Container className="ou-text-center ou-mt-5">
                            <h4 className='ou-text-red-600 ou-text-xl'>{t('common:errNullUser')}</h4>
                            <Button onClick={() => { router('/login') }}>{t('common:here')}!</Button>
                        </Container>
                    </Box>
                </Box>
            </>
        )
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