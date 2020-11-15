import React, {useState} from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconButton } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import UserInfoPopOver from "../member/UserInfoPopOver"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
  }
}));


function AccountButton(props){
  const classes = useStyles();
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
    <div style={{display:'inline'}} >
    <IconButton color="inherit">
        <AccountCircleIcon onClick={handleClick} fontSize="large" />
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
        horizontal: 'center',
    }}
    className={classes.popover}
    >
      
      <UserInfoPopOver  dialogClose={handleClose} removeCookie={removeCookie} setHasCookie={setHasCookie} hasCookie={hasCookie}/>
  </Popover>
    </div>
  );
}

  export default AccountButton;