import { Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
export default makeStyles((theme: Theme) => ({
  overlayAppBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbarOffset: theme.mixins.toolbar,
  rainbowOffset: {
    height: '5px',
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
  },
  nestedListItem: {
    paddingLeft: theme.spacing(3),
  },
  menuListContainer: {
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'column',
    overflow: 'hidden',
  },
  navListContainer: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'auto',
  },
  utilityListContainer: {
    flexShrink: 0,
    marginTop: theme.spacing(2),
  },
}));
