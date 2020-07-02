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
  },
  title: {
    cursor: 'pointer',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(7),
    },
  },
}));
