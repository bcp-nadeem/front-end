import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { IoCode, IoGitMerge   } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { FiBell } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import Image from '../minor/Image';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import UserAvatar from '../minor/UserAvatar';

    const darkTheme = createTheme({
        palette: {
        mode: 'light',
        primary: {
            main: '#f9f9f9',
        },
        },
    });

  const NavBar = () => {
    
    const {logout , user} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    console.log(user);
    
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link to="/user-profile">
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Link>
        <Link to="/">
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Link>
        
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';

    // Side Menu

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>

        <div className='nav-img-holder'>
          <Image src="https://bimcapability.com/assets/img/bimcap_logo.png" className="img-logo-nav" />
        </div>

        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className='nav-icon-style'><LuLayoutGrid /></ListItemIcon>
              <Link to='/dashboard'><ListItemText primary="Dashboards" /></Link>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className='nav-icon-style'><IoCode /></ListItemIcon>
              <Link to='/software'><ListItemText primary="Software's" /></Link>
            </ListItemButton>
          </ListItem>
          {
            user?.info?.emp_level == 1 && (
              <>
               <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className='nav-icon-style'><IoGitMerge /></ListItemIcon>
              <Link to='/category-list'><ListItemText primary="Category" /></Link>
            </ListItemButton>
          </ListItem>
             

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className='nav-icon-style'><FiBell /></ListItemIcon>
              <Link to="/email-notification"><ListItemText primary="Notifications" /></Link>
            </ListItemButton>
          </ListItem>
          </>
            )
          }
        </List>
      </Box>
    );
    // End Side nav

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
      </Menu>
    );

    return (
      <>
        {user?.isAuthenticated && (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>
              <AppBar position="static" className="nav-bar-style">
                <Toolbar>
                  <Button className="nav-btn-color" onClick={toggleDrawer(true)}>
                    <IoMenu />
                  </Button>
                  <Image
                    src="https://bimcapability.com/assets/img/bimcap_logo.png"
                    className="img-logo"
                  />
                  <Box sx={{ flexGrow: 1 }} />
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                      size="large"
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <UserAvatar src={`${import.meta.env.VITE_EEP_URL}/${user?.info?.employee_image}`} />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      onClick={handleMobileMenuOpen}
                      color="inherit"
                    >
                      <IoMdMore />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
            </ThemeProvider>

            {renderMobileMenu}
            {renderMenu}
          </Box>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </>
      )}
      </>
    );
  }

export default NavBar