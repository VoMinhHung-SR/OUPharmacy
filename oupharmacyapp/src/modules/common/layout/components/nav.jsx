import { AppBar, Avatar, Badge, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
// import Notifications from "../components/Notifications";
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"
import { useState } from "react";
import Logo from "../../../../../public/logo";
import useNav from "../../../pages/HomeComponents/hooks/useNav";
import { ListAlt } from "@mui/icons-material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import clsx from "clsx";

const pages = [
  {
    // Accept all user
    id: 'booking',
    name:'Booking',
    link: '/booking'
  },
  {  
    // Only user-doctor and nurse
    id: 'examinations',
    name:'examinations',
    link: '/examinations'
  },
  {  
    // Only user-Doctor
    id: 'prescriptions',
    name:'Prescriptions',
    link: '/prescriptions'
  },
];

const Nav = () => {
  
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

  //  Hooks useNav
  const {user, handleLogout} = useNav();
  let btn = <>
      <ul className="ou-flex ou-text-white">
          <MenuItem style={{ "color": "inherit" }} >
              <Link to="/login" className="nav-link">
                  <LoginIcon style={{ "marginRight": "5px" }} />Đăng nhập
              </Link>
          </MenuItem>
          <MenuItem style={{ "color": "inherit" }}>
              <Link to="/register" className="nav-link">
                  <HowToRegIcon style={{ "marginRight": "5px" }} />Đăng Ký
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
                        Danh sách lịch
                    </Typography>
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogout} >
                <Logout fontSize="small" />
                <Typography marginLeft={2}>
                    Đăng xuất
                </Typography>
            </MenuItem>
        </Menu>
        
        {/* Show nav menu */}
        <ul className="ou-flex">
          <MenuItem style={{ "padding": "0px" }}>
              <IconButton size="small" color="inherit" style={{ "marginRight": "5px" }}>
                  <Link to="/">
                      <HomeIcon className="" color="#f3f3f3"  />
                  </Link>
              </IconButton>
          </MenuItem>

          <MenuItem style={{ "padding": "0px" }}>
              <IconButton size="small" color="inherit">
                  <Badge 
                  badgeContent={4} 
                  color="error">
                      <Link to="/conversations">
                          <MailOutlineIcon className="" color="#f3f3f3"  />
                      </Link>
                  </Badge>
              </IconButton>
          </MenuItem>
          <Tooltip title="Open settings">
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
      if(pageID === 'prescriptions'|| pageID === 'prescriptions-mb')
        if(user && user.is_doctor)
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
        if(user && (user.is_doctor || user.is_nurse))
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
                <Typography
                    variant="h6"
                    noWrap
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
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
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
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
                
          <Box sx={{ flexGrow: 0 }}>
            {btn}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Nav