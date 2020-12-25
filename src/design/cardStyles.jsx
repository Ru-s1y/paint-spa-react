import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const cardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 280,
    margin: "1rem"
  },
  media: {
    height: 250,
    // width: 256,
    paddingTop: '100%', // 16:9
    // margin: '1em',
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