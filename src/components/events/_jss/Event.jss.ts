import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  eventPointer: {
    cursor: 'pointer',
  },
  secondaryText: {
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  social: {
    backgroundColor: 'green',
  },
  meeting: {
    backgroundColor: 'orange ',
  },
  community: {
    backgroundColor: 'plum',
  },
  meal: {
    backgroundColor: 'lightcoral',
  },
  alumni: {
    backgroundColor: 'maroon',
  },
  campus: {
    backgroundColor: 'lightseagreen',
  },
}));
