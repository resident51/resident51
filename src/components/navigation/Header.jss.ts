import { Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
export default makeStyles((theme: Theme) => ({
  overlayAppBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbarOffset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  drawer: {
    width: drawerWidth,
  },
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));
