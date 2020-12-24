import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const cardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 256,
    width: 256,
    // paddingTop: '100%', // 16:9
    margin: '1rem',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default cardStyles