import { Theme, makeStyles } from '@material-ui/core/styles';

interface StyleClass {
  [key: string]: StyleClass | string | number;
}

export default makeStyles((theme: Theme) => ({
  loginRoot: {
    display: 'flex',
    flexFlow: 'column',
  },
  closeButton: {
    margin: 0 - theme.spacing(2),
    alignSelf: 'flex-end',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 260,

    '& > *': {
      marginBottom: theme.spacing(2),
    },
    '& hr': {
      height: 2,
    },

    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
  },
  loginHeader: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  loginIcon: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& > *': {
      marginBottom: theme.spacing(2),
    },

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 2),
    },
  },
  loginButton: {
    alignSelf: 'center',
    marginTop: theme.spacing(1),
  },
  federatedProviderContainer: {
    display: 'flex',
    flexFlow: 'column',
    marginTop: theme.spacing(2),
  },
  federatedProviderButton: {
    padding: '10px 16px',
  },
  googleButton: {
    backgroundColor: '#f5f5f5',
    marginBottom: theme.spacing(2),
  },
  facebookButton: {
    backgroundColor: '#4267b2',
    '&:hover': {
      backgroundColor: '#32508c',
    },
  },
}));
