import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
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
  eventTimelineContent: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  lastTimelineConnector: {
    flexGrow: 0.85,
  },
}));
