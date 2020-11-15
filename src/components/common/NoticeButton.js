import React, {useState} from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconButton } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from '@material-ui/icons/Notifications';
import UserNoticePopOver from "../member/UserNoticePopOver"
function NoticeButton(props){
  const removeCookie = props.removeCookie
  const setHasCookie = props.setHasCookie
  const hasCookie = props.hasCookie
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
return (
    <div style={{display:'inline'}}>
    <IconButton color="inherit">
        <NotificationsIcon onClick={handleClick} fontSize="large" />
    </IconButton>
      <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    >
      <UserNoticePopOver dialogClose={handleClose} removeCookie={removeCookie} setHasCookie={setHasCookie} hasCookie={hasCookie}/>
  </Popover>
    </div>
  );
}

  export default NoticeButton;