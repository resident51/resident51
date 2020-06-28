import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  overlayAppBar: {
    boxShadow: `${theme.shadows[2]} white`,
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
    overflow: 'scroll',
    flex: '1 0 1',
    flexGrow: 1,
    height: '100%',
    // backgroundColor: theme.palette.primary.dark,
    zIndex: 0,
    '& *': {
      zIndex: 10,
    },
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(8),
    },
  },
  stars: {
    position: 'absolute',
    display: 'block',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    background: "#000 url('https://image.ibb.co/mjnygo/stars.png') repeat top center",
    backgroundRepeat: 'repeat-y',
  },

  twinkling: {
    position: 'absolute',
    display: 'block',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    background: "transparent url('https://image.ibb.co/ir1DE8/twinkling.png') repeat top center",
    animation: '$move-twink-back 200s linear infinite',
    '-moz-animation': '$move-twink-back 200s linear infinite',
    '-webkit-animation': '$move-twink-back 200s linear infinite',
    '-o-animation': '$move-twink-back 200s linear infinite',
  },

  '@keyframes move-twink-back': {
    from: { backgroundPosition: '0 0' },
    to: { backgroundPosition: '-10000px 5000px' },
  },

  '@keyframes move-clouds-back': {
    from: { backgroundPosition: '0 0' },
    to: { backgroundPosition: '10000px 0' },
  },
}));
