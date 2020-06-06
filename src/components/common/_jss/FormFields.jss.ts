import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  formikTextField: {
    marginBottom: theme.spacing(0.5),
  },
  formikTextFieldHelper: {
    marginLeft: 4,
    marginTop: 0,
  },
  inputContainer: {
    overflow: 'hidden',
  },
  strengthBarContainer: {
    position: 'absolute',
    height: 5,
    width: '100%',
    bottom: 0,
    left: 0,
    backgroundColor: '#ddd',
  },
  strengthBar: {
    height: '100%',
  },
  strengthBar0: {
    width: '20%',
    backgroundColor: '#ef2214',
  },
  strengthBar1: {
    width: '40%',
    backgroundColor: '#ff7600',
  },
  strengthBar2: {
    width: '60%',
    backgroundColor: '#f9c300',
  },
  strengthBar3: {
    width: '80%',
    backgroundColor: '#95c500',
  },
  strengthBar4: {
    width: '100%',
    backgroundColor: '#0f9018',
  },
}));
