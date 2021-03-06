import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  authActionButton: {
    marginLeft: 'auto',
    color: theme.palette.primary.contrastText,
  },
  signInButton: {
    marginRight: theme.spacing(1),
  },
  floatingMenuList: {
    padding: 0,
    '& li': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 40,
    },
  },
}));
