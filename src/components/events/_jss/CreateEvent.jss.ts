import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  eventsRoot: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    height: '100%',
  },
  title: {
    // marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));
