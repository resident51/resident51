import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  alertDialogContainer: {
    minWidth: `280px`,
  },
  alertDialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  alertDialogCancelButton: {
    height: 'fit-content',
  },
}));
