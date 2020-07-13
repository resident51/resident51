import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  authActionButton: {
    marginLeft: 'auto',
    color: theme.palette.primary.contrastText,
    '& > button': {
      marginLeft: theme.spacing(2),
    },
  },
  floatingMenuList: {
    padding: 0,

    '& li': {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 40,
    },
  },
}));
