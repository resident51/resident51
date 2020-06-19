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
  },
  title: {
    cursor: 'pointer',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(6),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar, // necessary for content to be below app bar
  },
}));
