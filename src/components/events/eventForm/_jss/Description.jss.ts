import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  description: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '800px',
    },
  },
}));
