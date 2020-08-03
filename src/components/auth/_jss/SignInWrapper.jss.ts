import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  signInWrapperRoot: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    boxShadow: theme.shadows[10],
  },
  forgotPassword: {
    position: 'absolute',
    zIndex: 2,
    height: '100%',
  },
  forgotPasswordHidden: {
    top: '-100%',
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.easeIn,
    }),
  },
  forgotPasswordVisible: {
    top: 0,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
}));
