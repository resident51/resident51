import PropTypes, { InferProps } from 'prop-types';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { AlertDialogControls, ModalCtx } from 'types';

import { useAlertDialog } from 'contexts/ui/AlertDialogProvider';
import { useModal } from 'contexts/ui/ModalProvider';

import SlideMenu from './SlideMenu';
import history from './history';

import useStyles from './Header.jss';

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
  const alertDialogContext: AlertDialogControls | null = useAlertDialog();
  const modalContext: ModalCtx = useModal();
  const classes = useStyles();

  const handleMenuButtonClick = useCallback(() => {
    setDrawerOpen(prevState => !prevState);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  useEffect(() => {
    const unlisten = history.listen(() => {
      setDrawerOpen(false);
    });

    return unlisten;
  }, []);

  return (
    <>
      <AppBar position="fixed" className={classes.overlayAppBar}>
        <Toolbar className={classes.rainbowBand}>
          <IconButton edge="start" className={classes.menuButton} onClick={handleMenuButtonClick}>
            {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography component="h1" variant="h6" onClick={(): void => history.push('/')}>
            Resident51
          </Typography>
          <Button>Login</Button>
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
