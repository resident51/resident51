import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  rootLink: {
    cursor: 'pointer',
  },
  disabledLink: {
    color: theme.palette.text.disabled,
    pointerEvents: 'none',
  },
}));
