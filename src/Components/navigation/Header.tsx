import React, { useCallback, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PropTypes, { InferProps } from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core/styles';

import SlideMenu from './SlideMenu';

const drawerWidth = 300;
const useStyles = makeStyles((theme: Theme) => ({
  overlayAppBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbarOffset: theme.mixins.toolbar,
  rainbowBand: {
    borderImage:
      'linear-gradient(100deg,' +
      'rgba(255, 36, 0, 0.7),' +
      'rgba(232, 29, 29, 0.7),' +
      'rgba(232, 183, 29, 0.7),' +
      'rgba(227, 232, 29, 0.7),' +
      'rgba(29, 232, 64, 0.7),' +
      'rgba(29, 221, 232, 0.7),' +
      'rgba(43, 29, 232, 0.7),' +
      'rgba(221, 0, 243, 0.7),' +
      'rgba(221, 0, 243, 0.7))' +
      ' 1',
    borderWidth: '5px 0 0',
    borderStyle: 'solid',
  },
  rainbowOffset: {
    height: '5px',
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  drawer: {
    width: drawerWidth,
  },
}));

const HeaderProps = {
  onLoginClick: PropTypes.func,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    profileImgSrc: PropTypes.string,
  }),
};

const Header: React.FC<InferProps<typeof HeaderProps>> = props => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const classes = useStyles();

  const handleMenuButtonClick = useCallback(() => {
    setDrawerOpen(prevState => !prevState);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <AppBar position="fixed" className={classes.overlayAppBar}>
        <Toolbar className={classes.rainbowBand}>
          <IconButton edge="start" className={classes.menuButton} onClick={handleMenuButtonClick}>
            {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography component="h1" variant="h6">
            Resident51
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.rainbowOffset} />
      <div className={classes.toolbarOffset} />
      <SlideMenu open={drawerOpen} onRequestClose={handleDrawerClose} />
    </>
  );
};

Header.propTypes = HeaderProps;

export default Header;

// #TODO merge the two appbars that now exist in the app after fixing all merge conflicts.
