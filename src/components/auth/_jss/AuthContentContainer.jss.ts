import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  authCard: {
    minWidth: '100%',
    maxWidth: 'calc(100vw - 2rem)',
    maxHeight: 'calc(100vh - 3rem)',
    overflow: 'auto',
    padding: theme.spacing(0, 2),
    display: 'flex',
    flexFlow: 'column',

    '&:focus': {
      outline: 'none',
    },
  },
  authLoadingIndicator: {
    position: 'fixed',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, -2),
    },
  },
  headerRoot: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  closeButton: {
    marginLeft: 'auto',
    marginBottom: 'auto',
    padding: 0,
  },
  headerContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  headerAvatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  cardContent: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    height: '100%',
    display: 'flex',
    flexFlow: 'column',

    '& form': {
      display: 'flex',
      flexFlow: 'column',
      marginTop: theme.spacing(2),

      '& button[type="submit"]': {
        alignSelf: 'center',
        margin: theme.spacing(2, 0),
      },
    },
  },
  errorAlert: {
    marginBottom: theme.spacing(1),
  },
  bottomText: {
    alignSelf: 'center',
  },
}));
