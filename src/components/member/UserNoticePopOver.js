import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {observer} from 'mobx-react'
import UserNoticeItem from './UserNoticeItem'
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  content:{
    padding: theme.spacing(1),
  },
  item:{
    marginBottom: '2.5%',
    "&:last-child": {
      marginBottom: '10%'
    }
  }
}));



const UserNoticePopOver = observer( (props) => {
    const classes = useStyles();
    const handleClose = props.dialogClose
    const removeCookie = props.removeCookie
    const setHasCookie = props.setHasCookie
    function logout(e){
      e.preventDefault()
      removeCookie('jwt', { path: '/' })
      alert("로그아웃 되었습니다")
      setHasCookie(false)
      handleClose()
    }

    return (
        <div className={classes.paper}>
          <div className={classes.content}>
                <UserNoticeItem className={classes.item} text={"정환님이 내 게시글에 댓글을 달았습니다"} date={"2019.10.01"} link={"/"}/>
                <UserNoticeItem className={classes.item} text={"정환님이 내 게시글에 댓글을 달았습니다"} date={"2019.10.01"} link={"/"}/>
            </div>
        </div>
    );
  }
)

export default UserNoticePopOver