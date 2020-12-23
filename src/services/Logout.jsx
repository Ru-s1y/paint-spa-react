import axios from 'axios'
import { types, useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import {
  Button,
  // IconButton
} from '@material-ui/core'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export default function Logout (props) {
  const alert = useAlert()
  const history = useHistory()

  const clickLogout = (e) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/auth/user_token`,
      { withCredentials: true }
      ).then(response => {
        localStorage.removeItem('exp')
        props.setUser({})
        props.setExp('')
        history.push('/')
        alert.show('ログアウトしました。', { type: types.SUCCESS })
      }).catch(error => {
        console.log(error)
        alert.show('ログアウトに失敗しました。', { type: types.ERROR })
      })
    e.preventDefault()
  }

  return (
    <div>
      <Button
        style={{marginLeft: "auto"}} 
        color="inherit"
        onClick={(e) => clickLogout(e)}
      >
        <MeetingRoomIcon />
      </Button>
    </div>
  )
}