import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  eventsRoot: {
    display: 'flex',
    zIndex: 10,
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    alignItems: 'center',
    width: '100%',
  },
  eventsListContainer: {
    flex: '2 1 0px',
  },
  eventOptionsTitle: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  eventsListOptions: {
    flex: '1 1 0px',
  },
  eventOptions: {
    // padding: theme.spacing(2),
    // paddingTop: theme.spacing(0),
  },
  eventSearchBoxContainer: {
    padding: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  eventSearchBox: {
    width: '100%',
  },
  publicFilters: {
    padding: theme.spacing(1),
    '& label': {
      display: 'flex',
      justifyContent: 'center',
      margin: 0,
      flexDirection: 'row-reverse',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'inherit',
      },
    },
  },
  eventsGridItem: {
    display: 'flex',
    flexFlow: 'row',
    flexGrow: 1,
  },
  eventList: {
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  secondaryText: {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
}));
