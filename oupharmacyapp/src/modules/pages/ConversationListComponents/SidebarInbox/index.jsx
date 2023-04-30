import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import Loading from "../../../common/components/Loading";
import SearchIcon from '@mui/icons-material/Search';
import useSidebarInbox from "./hooks/useSidebarInbox";
import ConversationDetail from "../ConversationComponents";
import { useTranslation } from "react-i18next";
import { AVATAR_DEFAULT } from "../../../../lib/constants";

const SidebarInbox = (props) => {
    const {t} = useTranslation(['conversation'])
    const {isLoadingRecipients, recipients, conversationsSnapshot, name, setName,
        createNewConversation} = useSidebarInbox(props.user)

    return (
        <>
            {isLoadingRecipients ?
                (<>
                    <Box sx={{ minHeight: "300px" }}>
                        <Box className='p-5'>
                            <Loading />
                        </Box>
                    </Box>
                </>)
                : <Grid>
                    <Grid item>
                        <Typography variant="subtitle1" gutterBottom component="div"
                            sx={{ paddingTop: 2, paddingLeft: 2, fontWeight: 'bold' }}>
                            {t('chat')}
                        </Typography>
                        <Box sx={{
                            margin: "5px 10px", padding: "0px 5px", display: 'flex',
                            alignItems: 'flex-end', width: "100%"
                        }}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx"
                                className="ou-w-[85%]"
                                placeholder={t('enterUserEmail')}
                                value={name}
                                onChange={(evt) => setName(evt.target.value)}
                                variant="standard" />
                        </Box>
                        <Divider />

                        <List sx={{ height: "500px", overflowY:"auto" }}>
                            <Typography className="ou-py-2 ou-text-center ou-text-green-700">{t('conversation')}</Typography>
                            {conversationsSnapshot?.docs.map((c)=>(
                                <ConversationDetail 
                                    id={c.id}
                                    key = {c.id}
                                    members={c.data().members}
                                />
                            ))}
                               <Divider />
                            <Typography className="ou-text-center ou-pt-4 ou-pb-2 ou-text-blue-700">{t('user')}</Typography>

                            {recipients.length === 0 ? <Box className="ou-text-center ou-py-3 ou-text-gray-400">{t('errNoRecipient')}</Box> 
                            
                                : ( recipients
                                    .filter((recipient) => {
                                        // Check if recipient's id is not in any of the conversation's members
                                        return !conversationsSnapshot?.docs.some(
                                          (conversation) => conversation.data().members.includes(recipient.id)
                                        );
                                      })
                                    .filter((obj)=> obj.id !== props.user.id).map((u) => (
                                        <ListItem className="ou-cursor-pointer hover:ou-bg-gray-300" key={u.id} id={u.id} onClick={()=>{
                                            createNewConversation(u.id);
                                        }}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={u.email ? u.email : "unknown"}
                                                    src={u.avatar_path ? u.avatar_path : AVATAR_DEFAULT}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Box className="ou-truncate">{u.email}</Box>}
                                                secondary={"Xin chao ban"}
                                            />
                                        </ListItem>))
                                    )
                            }

                        </List>
                    </Grid>
                </Grid>}

        </>)
}
export default SidebarInbox