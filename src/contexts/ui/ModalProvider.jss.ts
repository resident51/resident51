import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  modalRootContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    position: 'relative',
    margin: theme.spacing(3),
  },
  modalLoadingContainer: {
    position: 'absolute',
    zIndex: 0,
    border: '1px solid transparent',
    borderRadius: theme.shape.borderRadius,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));
