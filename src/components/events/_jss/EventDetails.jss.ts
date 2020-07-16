import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  detailsRoot: {
    display: 'flex',
    flexFlow: 'column',
  },
  closeButton: {
    margin: 0 - theme.spacing(2),
    alignSelf: 'flex-end',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'min(calc(100vw - 40px), 400px)',
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: 500,
    },
  },
  hr2: {
    height: 2,
    alignSelf: 'stretch',
  },
  detailsHeader: {
    display: 'flex',
    flexFlow: 'column',
    marginBottom: theme.spacing(1),
  },
  title: {
    lineHeight: 1.2,
    marginBottom: theme.spacing(1),
    opacity: 1,
    textAlign: 'center',
  },
  detailsSubheader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  underHeader: {
    opacity: 0.6,
  },
  locationText: {
    fontWeight: 'bold',
  },
  eventDescription: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    opacity: 1,
    fontSize: '1.1rem',
  },
  secondary: {
    opacity: 0.6,
  },
  eventActions: {
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      padding: theme.spacing(1),
      margin: theme.spacing(2),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  editButton: {
    background: theme.palette.warning.main,
    color: 'white',
    '&:hover': {
      background: theme.palette.warning.light,
    },
  },
  deleteButton: {
    background: theme.palette.error.main,
    color: 'white',
    '&:hover': {
      background: theme.palette.error.light,
    },
  },
}));
