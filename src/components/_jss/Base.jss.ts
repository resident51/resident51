import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flexGrow: 1,
    overflowY: 'scroll',
    height: '100%',
  },
}));
