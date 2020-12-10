import React, { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  Button,
  Typography,
  colors,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import { nanoid } from 'nanoid';

import roles from 'utils/roles';
import Banner from './Banner';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  header: {
    marginTop: theme.spacing(1.5),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  mainDivider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <NavLink {...props} />
  </div>
));

const Sidebar = (props) => {
  const { open, variant, onClose } = props;
  const classes = useStyles();
  const { user } = useSelector((state) => state.authentication);
  const userRoles = user.roles.map((role) => role.id);

  const bannerText = {
    heading: process.env.REACT_APP_NAME,
    subheading: 'System',
  };

  const pages = useMemo(
    () => [
      {
        id: nanoid(),
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />,
        roles: [roles.user, roles.admin],
      },
      { id: nanoid(), divider: true, roles: [roles.admin] },
      {
        id: nanoid(),
        header: true,
        title: 'Maintenance',
        roles: [roles.admin],
      },
      {
        id: nanoid(),
        title: 'Users',
        href: '/users',
        icon: <PeopleIcon fontSize="small" />,
        roles: [roles.admin],
      },
    ],
    []
  );

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={classes.root}>
        <Banner
          heading={bannerText.heading}
          subheading={bannerText.subheading}
        />
        <Divider className={classes.mainDivider} />
        <List className={classes.nav}>
          {pages
            .filter(
              (page) =>
                page.roles.filter((role) => userRoles.includes(role)).length
            )
            .map((page) => {
              if (page.divider)
                return <Divider className={classes.divider} key={page.id} />;

              if (page.header)
                return (
                  <Typography
                    gutterBottom
                    className={classes.header}
                    key={page.id}
                  >
                    {page.title}
                  </Typography>
                );

              return (
                <ListItem className={classes.item} disableGutters key={page.id}>
                  <Button
                    activeClassName={classes.active}
                    className={classes.button}
                    component={CustomRouterLink}
                    to={page.href}
                  >
                    <div className={classes.icon}>{page.icon}</div>
                    {page.title}
                  </Button>
                </ListItem>
              );
            })}
        </List>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
