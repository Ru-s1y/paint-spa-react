import { makeStyles } from '@material-ui/core/styles';
// const gridStyles = makeStyles((theme) => ({
const gridStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
    overflow: 'hidden',
  },
  gridList: {
    // flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));
  

export default gridStyles