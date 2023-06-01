import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { useNavigate } from "react-router"
import Loading from "../../../common/components/Loading"
import useConversationDetail from "../hooks/useConvesationDetail"
import { AVATAR_DEFAULT } from "../../../../lib/constants"
import { useTranslation } from "react-i18next"

const ConversationDetail = (props) => {
    const {t} = useTranslation(['common'])
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
                        alt={docs?.docs[0]?.data().email ? docs?.docs[0].data().email : t('common:undefined')}
                        src={docs?.docs[0]?.data().avatar ? docs?.docs[0].data().avatar : AVATAR_DEFAULT}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={<Box className="ou-truncate">{docs?.docs[0]?.data().fullName}</Box>}
                    secondary={docs?.docs[0]?.data().email}
                />
            </ListItem>
        ): <>
            <Typography>Hiện tại chưa có hội thoại</Typography>
        </>}
    </>)
}
export default ConversationDetail