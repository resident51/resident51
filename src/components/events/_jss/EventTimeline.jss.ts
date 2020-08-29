import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  eventTimelineRoot: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  timelineMarkerDefault: {
    minWidth: '120px',
    flex: 'unset',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inherit',
    },
  },
  timelineMarkerSmall: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  lastTimelineConnector: {
    flexGrow: 0.85,
  },
  eventTimelineContent: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
}));
