import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useTranslation } from 'react-i18next';
import { ListItemIcon, ListItemButton, ListItemText, Toolbar,
    MenuItem, Tooltip, Button, Box, List, Menu, Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import FlagUK from '../../../../../public/flagUK';
import FlagVN from '../../../../../public/flagVN';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { changeLanguage } from "i18next";
import useNav from '../../../pages/HomeComponents/hooks/useNav';
import { ERROR_CLOUDINARY, ROLE_DOCTOR } from '../../../../lib/constants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from '@mui/icons-material/Payment';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: "white",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      color: 'white',
      backgroundColor: '#1976d2',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const NavDashboard = () => {
    
    const [anchorEl, setAnchorEl] = useState(null);
    const openSettingMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const location = useLocation()
    
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const {t, i18n}= useTranslation(['common', 'modal']);


    const pages = [
        // Accept all user doctor and nurse
        {
          id: 'dashboard',
          name:t('home'),
          icon: <HomeIcon  className='ou-text-white'/>,
          link: '/dashboard'
        },
        // {
        //   id: 'products',
        //   name:t('products'),
        //   icon: <CategoryIcon  className='ou-text-white'/>,
        //   link: '/dashboard/products'
        // },
        {  
          id: 'examinations',
          name:t('examinations'),
          icon: <AssignmentIcon className='ou-text-white'/>,
          link: '/dashboard/examinations'
        }
      ];
    const page_ROLE_DOCTOR = [ 
        {  
          // Only user-Doctor
          id: 'prescribing',
          name:t('prescribing'),
          icon: <MedicalServicesIcon className='ou-text-white'/>,
          link: '/dashboard/prescribing'
        }

    ]
    const page_ROLE_NURSE= [ 
      {  
        // Only user-Doctor
        id: 'payments',
        name:t('payments'),
        icon: <PaymentIcon className='ou-text-white'/>,
        link: '/dashboard/payments'
      }]
    const {user, handleLogout} = useNav();
    let btn = <>
        <ul className="ou-flex ou-items-center ou-text-[#070707]">
          <Link to="/login">
              <MenuItem style={{ "color": "inherit" }} >
                    <LoginIcon style={{ "marginRight": "5px" }} />{t('login')}
              </MenuItem>
            </Link>
        </ul>
    </>

    const renderPage = (routingRole) => {
      return routingRole && routingRole.map(item => (
        <Link to={`${item.link}`} key={`${item.id}_tl`}>
              <ListItemButton>
                  <ListItemIcon >
                    {item.icon && item.icon}
                  </ListItemIcon>
                  <ListItemText primary={`${item.name}`}/>
              </ListItemButton>
          </Link>
    ))

    }
    const renderHeadingTitle = (path) => {
      if(path=== '/dashboard')
        return 'Dashboard'
      const parts = path.split('/dashboard/')
      if(path.length > 1){
        const wordsAfterDashboard = parts[1].split('/');
        const firstWord = wordsAfterDashboard.find(word => word !== '');
        return firstWord || null // Return null if no word is found
      }
      return null  // Return null if "/dashboard/" is not in the path
    }

    if (user){
        btn = <>
            <Menu anchorEl={anchorEl} id="account-menu" open={openSettingMenu} onClose={handleClose} onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 12,
                            width: 15,
                            height: 15,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <Link to="/dashboard/profile" className="nav-link" style={{ "padding": "0px" }}>
                    <MenuItem style={{ "color": "#333" }}>
                        <AccountCircleIcon fontSize="small" />
                        <Typography marginLeft={2}>
                        Trang cá nhân
                        </Typography>
                    </MenuItem>
                </Link>
                <Divider className="!ou-m-[0px]" />
                {/* <MenuItem style={{ "color": "#333" }} className="!ou-py-2" onClick={handleOpenModal}>
                        <AccountCircleIcon fontSize="small" />
                        <Typography marginLeft={2}>
                          change password
                        </Typography>
                </MenuItem>
                <Divider className="!ou-m-[0px]"/> */}
                <MenuItem onClick={handleLogout} >
                    <Logout fontSize="small" />
                    <Typography marginLeft={2}>
                        {t('logout')}
                    </Typography>
                </MenuItem>
            </Menu>
            
            {/* Show nav menu */}
            <ul className="ou-flex ou-justify-center ou-items-center">
              <Tooltip followCursor title={t('openSettings')}>
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}>
                  <Avatar sx={{ width: 32, height: 32 }} 
                  className="ou-bg-cyan-50"
                  src={(user.avatar_path && user.avatar_path != ERROR_CLOUDINARY) ? user.avatar_path : "https://res.cloudinary.com/dl6artkyb/image/upload/v1666353307/OUPharmacy/logo_oupharmacy_kz2yzd.png"} 
                  alt={user.first_name + " " + user.last_name}/> 
                </IconButton>
              </Tooltip>
              
            </ul>
            
            {/* End nav menu */}
        </>
    }
    return (
        <>
        <AppBar position="absolute" open={open}>
            <Toolbar >
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                    ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    noWrap
                    color='#707070'
                    sx={{ flexGrow: 1 }}
                >
                    {t(renderHeadingTitle(location.pathname))}
                </Typography>

                <Box sx={{ flexGrow: 0 }} className="ou-flex">
                {i18n.language === 'en' ? 
                    <Tooltip followCursor title={t('changeLanguage')}>
                    <Button className="!ou-text-white" onClick={()=> changeLanguage('vi')}>
                        <FlagUK width={30} height={30}/>
                    </Button> 
                    </Tooltip>
                    :
                    <Tooltip followCursor title={t('changeLanguage')}>
                    <Button className="!ou-text-white" onClick={()=> changeLanguage('en')}>
                        <FlagVN width={30} height={30}/>
                    </Button>
                    </Tooltip>
                }
                {btn}
                </Box>
            </Toolbar>
        </AppBar>


        <Drawer variant="permanent" open={open} >
            <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            }}
            
            >
            <IconButton color="inherit" onClick={toggleDrawer}>
                <ChevronLeftIcon />
            </IconButton>
            </Toolbar>
            <Divider />

            {/* Nav */}
            <List component="nav">
    
            {renderPage(pages)}
            <Divider sx={{ my: 1 }} />

            {renderPage(page_ROLE_DOCTOR)}

            <Divider sx={{ my: 1 }} />
            {renderPage(page_ROLE_NURSE)}

            </List>

        </Drawer>
        </>
        
    )
}

export default NavDashboard