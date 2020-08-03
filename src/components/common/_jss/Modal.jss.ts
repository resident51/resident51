import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  modalRootContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    margin: theme.spacing(3),

    '&:focus': {
      outline: 'none',
    },
  },
  loadingPaper: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  loadingIndicator: {
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    maxHeight: 'calc(100vh - 10px)',
    maxWidth: 'calc(100vw - 10px)',
    overflow: 'auto',
  },
}));
