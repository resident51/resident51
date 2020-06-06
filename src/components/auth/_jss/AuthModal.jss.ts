import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  authModalRoot: {
    position: 'relative',
    width: 330,
    maxWidth: 'calc(100vw - 16px)',

    '&:focus': {
      outline: 'none',
    },
    '& > div': {
      '&:focus': {
        outline: 'none',
      },
    },

    [theme.breakpoints.up('sm')]: {
      width: 450,
    },
  },
  positionedModal: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
}));
