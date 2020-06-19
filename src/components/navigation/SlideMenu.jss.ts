import { Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
export default makeStyles((theme: Theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  drawer: {
    overflowX: 'hidden',

    [theme.breakpoints.up('sm')]: {
      transition:
        theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.short,
        }) + ' !important',
    },
  },
  drawerOpen: {
    width: drawerWidth,
  },
  drawerClose: {
    width: theme.spacing(7),
  },
  nestedListItem: {
    paddingLeft: theme.spacing(3),
  },
  menuListContainer: {
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'column',
    overflow: 'hidden',
    width: drawerWidth,
  },
  navListContainer: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
  },
  navListClose: {
    overflowX: 'hidden',
  },
  utilityListContainer: {
    flexShrink: 0,
    marginTop: theme.spacing(1),
  },
}));
