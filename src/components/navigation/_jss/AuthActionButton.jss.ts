import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  authActionButton: {
    marginLeft: 'auto',
    color: theme.palette.primary.contrastText,
  },
}));
