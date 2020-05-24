import { Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
export default makeStyles((theme: Theme) => ({
  overlayAppBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbarOffset: theme.mixins.toolbar,
  rainbowBand: {
    borderImage:
      'linear-gradient(100deg,' +
      'rgba(255, 36, 0, 0.7),' +
      'rgba(232, 29, 29, 0.7),' +
      'rgba(232, 183, 29, 0.7),' +
      'rgba(227, 232, 29, 0.7),' +
      'rgba(29, 232, 64, 0.7),' +
      'rgba(29, 221, 232, 0.7),' +
      'rgba(43, 29, 232, 0.7),' +
      'rgba(221, 0, 243, 0.7),' +
      'rgba(221, 0, 243, 0.7))' +
      ' 1',
    borderWidth: '5px 0 0',
    borderStyle: 'solid',
  },
  rainbowOffset: {
    height: '5px',
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.contrastText,
  },
  drawer: {
    width: drawerWidth,
  },
}));
