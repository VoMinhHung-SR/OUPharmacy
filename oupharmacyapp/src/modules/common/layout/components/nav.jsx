import { AppBar, Avatar, Badge, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"
import { useState } from "react";
import Logo from "../../../../../public/logo";
import useNav from "../../../pages/HomeComponents/hooks/useNav";
import { ListAlt } from "@mui/icons-material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlagUK from "../../../../../public/flagUK";
import FlagVN from "../../../../../public/flagVN";
import { ROLE_DOCTOR, ROLE_NURSE } from "../../../../lib/constants";


const Nav = () => {
  
  const { t, i18n } = useTranslation('common');
  // State trigger menu open
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
      setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const pages = [
    {
      // Accept all user
      id: 'booking',
      name:t('booking'),
      link: '/booking'
    },
    {  
      // Only user-doctor and nurse
      id: 'examinations',
      name:t('examination'),
      link: '/examinations'
    },
    {  
      // Only user-Doctor
      id: 'pescribings',
      name:t('prescribing'),
      link: '/prescribing'
    },
  ];

  //  Hooks useNav
  const {user, handleLogout} = useNav();
  let btn = <>
      <ul className="ou-flex ou-text-white">
          <MenuItem style={{ "color": "inherit" }} >
              <Link to="/login" className="nav-link">
                  <LoginIcon style={{ "marginRight": "5px" }} />{t('login')}
              </Link>
          </MenuItem>
          <MenuItem style={{ "color": "inherit" }}>
              <Link to="/register" className="nav-link">
                  <HowToRegIcon style={{ "marginRight": "5px" }} />{t('register')}
              </Link>
          </MenuItem>
      </ul>
  </>

  if (user){
    btn = <>
        <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}
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
            {/* <Link to="/profile" className="nav-link" style={{ "padding": "0px" }}>
                <MenuItem style={{ "color": "#333" }}>
                    <Avatar src={user.avatar_path} /> Trang cá nhân
                </MenuItem>
            </Link>
            <Divider /> */}
            <Link to="/users/examinations" className="nav-link" style={{ "padding": "0px" }}>
                <MenuItem style={{ "color": "#333" }}>
                    <ListAlt fontSize="small" />
                    <Typography marginLeft={2}>
                        {t('bookingList')}
                    </Typography>
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogout} >
                <Logout fontSize="small" />
                <Typography marginLeft={2}>
                    {t('logout')}
                </Typography>
            </MenuItem>
        </Menu>
        
        {/* Show nav menu */}
        <ul className="ou-flex">
          <MenuItem style={{ "padding": "0px" }}>
              <IconButton size="small" color="inherit">
                  <Badge 
                  badgeContent={4} 
                  color="error">
                      <Link to="/conversations">
                          <MailOutlineIcon color="#f3f3f3"  />
                          {/* <FlagUK width={24} height={24}/> */}
                      </Link>
                  </Badge>
              </IconButton>
          </MenuItem>
          
            <IconButton onClick={handleClick} size="small" color="inherit" sx={{ ml: 1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
                  <Badge 
                    badgeContent={4} 
                    color="error">
                    <NotificationsIcon color="#f3f3f3"/>
                  </Badge>
            </IconButton>
       
          <Tooltip title={t('openSettings')}>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
                <Avatar sx={{ width: 32, height: 32 }} src={user.avatar_path}/>
            </IconButton>
          </Tooltip>
         
        </ul>
        
        {/* End nav menu */}
    </>
  }

  const renderElementNav = (pageID, pageLink, pageName, isMobile = false) => {
    // Render for doctor
      if(pageID === 'pescribings'|| pageID === 'pescribings-mb')
        if(user && user.role === ROLE_DOCTOR)
          return(
            <Link to={pageLink}>
              <Button 
                key={pageID}
                onClick={handleCloseNavMenu}
                className={clsx('',{
                  '!ou-text-black': isMobile,
                  "!ou-text-white": !isMobile})
                }
                sx={{mx: 1, my: 1, display: 'block' }}
                
              >
                {pageName}
              </Button>
              </Link>
          )
        else return 
      // Render for nurse
      // if(pageID === 'payments'|| pageID === 'payments-mb')
      //   if(user && user.is_nurse)
      //     return(
      //       <Link to={pageLink}>
      //         <Button 
      //           key={pageID}
      //           onClick={handleCloseNavMenu}
      //           className={clsx('',{
      //             '!ou-text-black': isMobile,
      //             "!ou-text-white": !isMobile})
      //           }
      //           sx={{mx: 1, my: 1, display: 'block' }}
                
      //         >
      //           {pageName}
      //         </Button>
      //         </Link>
      //     )
      //   else return 
    // Render for both doctor and nurse
      if(pageID === 'examinations' || pageID === 'examinations-mb')
        if(user && (user.role === ROLE_DOCTOR || user.role === ROLE_NURSE))
          return(
            <Link to={pageLink}>
              <Button 
                key={pageID}
                onClick={handleCloseNavMenu}
                sx={{ mx: 1, my: 1, display: 'block' }}
                className={clsx('',{
                  '!ou-text-black': isMobile,
                  "!ou-text-white": !isMobile})
                }
              >
                {pageName}
              </Button>
              </Link>
          )  
        else return
      // Render Default
      return (
        <Link to={pageLink}>
          <Button 
            key={pageID}
            onClick={handleCloseNavMenu}
            sx={{  mx: 1, my: 1, display: 'block' }}
            className={clsx('',{
              '!ou-text-black': isMobile,
              "!ou-text-white": !isMobile})
            }
          >
            {pageName}
          </Button>
          </Link>
      )
  }
  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Link to="/" className="ou-flex ou-items-center" >
                <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                    <Logo width={50} height={50} className="ou-text-white ou-mr-2" color={'white'}/>
                </Box>
                <Typography variant="h6" noWrap
                    sx={{
                      mr: 2,
                      my: 0,
                      py: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                >
                    OUPHARMACY
                </Typography>
            </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
                {pages.map((page) => renderElementNav(page.id+"-mb", page.link, page.name, true))}
            </Menu>
          </Box>
          <Link to="/"  >
                <Avatar alt="OUPharmacy-Logo"  
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                        src="https://res.cloudinary.com/dl6artkyb/image/upload/v1666354767/OUPharmacy/logo_oupharmacy_1x1_zks7t4.png" />
            </Link>
          <Typography variant="h5" noWrap component="a" href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OUPHARMACY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => renderElementNav(page.id, page.link, page.name))}
          </Box>
                
          <Box sx={{ flexGrow: 0 }} className="ou-flex">
            {i18n.language === 'en' ? 
              <Tooltip title={t('changeLanguage')}>
                <Button className="!ou-text-white" onClick={()=> changeLanguage('vi')}>
                  <FlagUK width={30} height={30}/>
                </Button> 
              </Tooltip>
              :
              <Tooltip title={t('changeLanguage')}>
                <Button className="!ou-text-white" onClick={()=> changeLanguage('en')}>
                  <FlagVN width={30} height={30}/>
                </Button>
              </Tooltip>
            }
            {btn}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Nav