import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  eventSearchBox: {
    width: '100%',
  },
  hideClearSearch: {
    display: 'none',
  },
  eventSearchFilter: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  eventSearchBoxContainer: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(0),
  },
}));
