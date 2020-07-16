import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  eventList: {
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    paddingTop: 'unset',
    paddingBottom: 'unset',
    // maxWidth: '600px',
  },
}));
