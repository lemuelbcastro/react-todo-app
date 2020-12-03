import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Avatar,
  Menu,
  Typography,
  MenuItem,
  Divider,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';

import { logout } from '../Authentication/authenticationSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  avatar: {},
  menu: {
    minWidth: 265,
  },
  menuAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontSize: '32px',
  },
  menuUser: {
    width: '100%',
  },
  menuIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(2),
  },
}));

const Header = (props) => {
  const { onSidebarOpen } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.authentication);
  const letterAvatar = user.name.charAt(0);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Hidden smUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div className={classes.flexGrow} />
        <IconButton
          size="small"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <Avatar className={classes.avatar}>{letterAvatar}</Avatar>
        </IconButton>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.menu }}
          disableAutoFocusItem
        >
          <div className={classes.menuUser}>
            <Box display="flex" p={1}>
              <Box p={1} flexShrink={0}>
                <Avatar className={clsx(classes.avatar, classes.menuAvatar)}>
                  {letterAvatar}
                </Avatar>
              </Box>
              <Box p={1} width="100%" display="flex" alignItems="center">
                <div>
                  <Typography variant="h5" weight="medium">
                    {user.name}
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </div>
              </Box>
            </Box>
          </div>
          <Divider />
          <MenuItem
            className={classes.menuItem}
            onClick={() => dispatch(logout())}
          >
            <ExitToAppIcon className={classes.menuIcon} /> Log Out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Header;
