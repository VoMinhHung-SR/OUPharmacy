import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import Loading from "../../../common/components/Loading"
import useConversationDetail from "../hooks/useConvesationDetail"

const ConversationDetail = (props) => {
    const {docs, loading, error, recipientId} = useConversationDetail(props.members)
    const router = useNavigate()
    const onSelectConversation = () =>{
        router(`/conversations/${props.id}/${recipientId}/message`)
    }
    if (loading)
        return <Loading/>
    return (<>
        {error ? <div>có lỗi xảy ra</div> : <></>}
       
        {docs?.docs[0]?.data() !== null ? (
            <ListItem className="ou-cursor-pointer hover:ou-bg-gray-300" key={docs?.docs[0]?.data().id} 
                onClick={onSelectConversation}
            >
                <ListItemAvatar>
                    <Avatar
                        alt={docs?.docs[0]?.data().username ? docs?.docs[0].data().username : "kHÔNG RÕ"}
                        src={docs?.docs[0]?.data().avatar ? docs?.docs[0].data().avatar : "https://mui.com/static/images/avatar/1.jpg"}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={docs?.docs[0]?.data().username}
                    secondary={"Xin chao ban"}
                />
            </ListItem>
        ): <>
            <Typography>Hiện tại chưa có hội thoại</Typography>
        </>}
    </>)
}
export default ConversationDetail