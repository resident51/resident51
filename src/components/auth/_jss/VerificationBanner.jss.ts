import { Theme, darken, lighten, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => {
  const applyBackgroundEffect = theme.palette.type === 'light' ? lighten : darken;

  return {
    verificationBannerContainer: {
      position: 'relative',
      boxShadow: theme.shadows[1],
    },
    verificationBannerMessage: {
      width: '100%',
      textAlign: 'center',
    },
    collapseToggle: {
      width: '100%',
      height: 16,
      marginTop: -4,
      backgroundColor: applyBackgroundEffect(theme.palette.warning.main, 0.9),
      color: theme.palette.text.secondary,
      textAlign: 'center',

      '&:focus': {
        outline: 'none',
      },

      '& svg': {
        height: 12,
        width: 12,
      },
    },
  };
});
