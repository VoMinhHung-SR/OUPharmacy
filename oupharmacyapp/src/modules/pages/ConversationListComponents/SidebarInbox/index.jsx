import { Avatar, Box, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import Loading from "../../../common/components/Loading";
import SearchIcon from '@mui/icons-material/Search';
import useSidebarInbox from "./hooks/useSidebarInbox";
import ConversationDetail from "../ConversationComponents";

const SidebarInbox = (props) => {
    const {isLoadingRecipients, recipients, conversationsSnapshot, 
        createNewConversation} = useSidebarInbox(props.user)
    // if(!props.user){
    //     return <></>
    // }
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
                            Trò chuyện
                        </Typography>
                        <Box sx={{
                            margin: "5px 10px", padding: "0px 5px", display: 'flex',
                            alignItems: 'flex-end', width: "100%"
                        }}>
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx"
                                placeholder="Nhập email người dùng..."
                                // value={name}
                                // onChange={(evt) => setName(evt.target.value)}
                                variant="standard" />
                        </Box>
                        <Divider />
                        <List sx={{ height: "500px", overflowY:"auto" }}>
                            <Typography className="ou-text-center ou-p-2">Hộp thoại tin nhắn</Typography>
                            {conversationsSnapshot?.docs.map((c)=>(
                                <ConversationDetail 
                                    id={c.id}
                                    key = {c.id}
                                    members={c.data().members}
                                />
                            ))}
                            <Typography className="ou-text-center ou-p-2">Người dùng tìm kiếm</Typography>
                            {recipients.filter((obj)=> obj.id !== props.user.id).map((u) => (
                            <ListItem className="ou-cursor-pointer hover:ou-bg-gray-300" key={u.id} id={u.id} onClick={()=>{
                                createNewConversation(u.id);
                            }}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={u.email ? u.email : "kHÔNG RÕ"}
                                        src={u.avatar_path ? u.avatar_path : "https://mui.com/static/images/avatar/1.jpg"}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Box className="ou-truncate">{u.email}</Box>}
                                    secondary={"Xin chao ban"}
                                />
                            </ListItem>)

                            )}

                        </List>
                    </Grid>
                </Grid>}

        </>)
}
export default SidebarInbox