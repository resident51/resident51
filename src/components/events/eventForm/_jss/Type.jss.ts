import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  fullWidth: {
    width: '100%',
  },
  typeContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    [theme.breakpoints.up('md')]: {
      width: '800px',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr',
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(2),
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
      },
    },
    margin: 'unset',
    width: '100%',
  },
  option: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
}));
