import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  signUpContainer: {
    boxShadow: theme.shadows[10],
  },
  hallDetailsContainer: {
    display: 'inline-flex',
  },
  hallField: {
    marginRight: theme.spacing(2),
    width: 100,
    flexGrow: 1,
    flexShrink: 1,
  },
  roomNumberField: {
    width: 100,
    flexShrink: 1,
  },
}));
