import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  eventsRoot: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    height: '100%',
  },
  eventsNavHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '0',
    paddingRight: '0',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
      paddingRight: theme.spacing(4),
    },
  },
  eventNavTabs: {
    flexGrow: 1,
  },
  eventViewToggle: {
    marginRight: theme.spacing(2),
    '& button': {
      borderRadius: 'unset',
    },
  },
  createEventButton: {
    color: 'white',
    background: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  buttonIsToggled: {
    backgroundColor: theme.palette.grey[300],
  },
}));
