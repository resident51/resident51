import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  overlayAppBar: {
    boxShadow: theme.shadows[2],
  },
  toolbarOffset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  title: {
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flexFlow: 'column',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(7),
    },
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
  },
}));
