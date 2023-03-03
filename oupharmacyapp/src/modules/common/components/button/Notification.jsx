import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge } from '@mui/material';
import NotifyMessage from '../../../pages/NotificationComponents/NotifyMessage';
import Loading from '../Loading';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useTranslation } from 'react-i18next';

export default function NotificationButton(props) {
  const {t} = useTranslation(['common'])
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[t('common:notifications')].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.isLoading && props.length === 0 ? <>
          <Box>
              <Loading/>
          </Box>
        </> : props.length === 0 ? <>
              <ListItemButton>
                <ListItemText primary={t('common:nonNotifications')} />
              </ListItemButton>
        </> :<>
            {props.items.map((content) =>(
              <NotifyMessage key={content.id} 
                content={content.content}
                recipientId={content.recipient_id}
                examinationId={content.booking_id}
                sentAt={content.sent_at}
              />
            )
            )}
        </>}

      </List>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Badge 
                badgeContent={props.length} 
                color="error"
                onClick={toggleDrawer(anchor, true)}
            >
                <NotificationsIcon sx={{fontSize:"26px"}}   className='ou-text-[#f3f3f3]'/>
            </Badge>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
