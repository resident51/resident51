import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  facilitationContainer: {
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
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
      },
    },
    margin: 'unset',
    width: '100%',
  },
}));
