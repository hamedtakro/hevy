import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@mui/material';
// import {PersonAdd,Settings,Logout,ContentPasteIcon,FitnessCenterIcon} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import React, { useState } from 'react';
import logo from "../../logo.png";
import logors from "../../logors.png";
import Stack from '@mui/material/Stack';
import Check from '../authentication/checkNumber'
import '../../App.css';
import './navbar.css';
import { Disclosure, Transition } from '@headlessui/react';
import { BellIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom'

function Navbar() {
  const [log, setLog] = useState(false);

  const handleLogin = () => setLog(true);
  const handleLogout = () => {
    localStorage.clear()
  };

  const token = localStorage.getItem("token")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = localStorage.getItem("name")
  return (
    <>
    <nav className="nav shadow hidden sm:flex">
      <div className="navBar ">
        <div className='navBox mx-10'>
          <div className="navLogo">
            <a href='/'><img className='hidden sm:flex' src={logo} width="110" height="26" /></a>
            <a href='/'><img className='flex sm:hidden ' src={logors} width="35  " height="35" /></a>
          </div>
          <div className="navMenu ">
            <Link to='/routines' className='hidden sm:flex'>
              <div className='navMenuItem space-x-3'>
                <Typography className='hidden sm:flex'>??????????</Typography> <ContentPasteIcon fontSize="small" />
              </div>
            </Link>
            <Link to='/exercise'>
              <div className='navMenuItem mx-6 space-x-3'>
                <Typography className='hidden sm:flex mx-3'>???????? </Typography> <FitnessCenterIcon fontSize="small" />
              </div>
            </Link>
            <Link to='/'>
              <div className='navMenuItem space-x-3'>
                <Typography className='hidden sm:flex'>????????</Typography>  <HomeIcon fontSize="small" />
              </div>
            </Link>
          </div>

        </div>
       
       
        <div className='navBox float-right'>
        <h1 className='name-user  '>{user}</h1>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 45, height: 45 }}>M</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 45,
                  height: 45,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Link to='/settings'><MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            </Link>
            {!token ?
              <a href='/Login' onClick={handleLogin}>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Login
                </MenuItem>
              </a>
              :
              <a href='/Logout' onClick={handleLogout}>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </a>
            }
          </Menu>
        </div>
      </div>
    </nav>


    <nav className="bg-white navBarMobile  space-x-32 justify-between shadow flex sm:hidden ">

      <div className='navBox mr-0'>
        <div className="navLogo mr-2">
          <a href='/'><img className='hidden sm:flex' src={logo} width="110" height="26" /></a>
          <a href='/'><img className='flex sm:hidden ' src={logors} width="35  " height="35" /></a>
        </div>
      </div>

      <div className='navBox ml-0 '>
      <h1 className='name-user  '>{user}</h1>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 45, height: 45 }}>M</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 45,
                height: 45,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Link to='/settings'><MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          </Link>
          {!token ?
            <a href='/Login' onClick={handleLogin}>
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            </a>
            :
            <a href='/Logout' onClick={handleLogout}>
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </a>
          }
        </Menu>
      </div>
      
  </nav>
    </>
  );
}


export default Navbar;
