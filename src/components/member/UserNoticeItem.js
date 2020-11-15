import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {observer} from 'mobx-react'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem'
const useStyles = makeStyles((theme) => ({
  root: {
  },
  wrapper: {
    display: 'inline-flex',
  },
  textField: {
    marginRight:'3%'
  },
  text: {
    fontSize : "0.9rem",
    color : 'black',
  },
  date: {
    fontSize : '0.8rem',
    color : 'black',
  },
  iconField:{
      alignSelf:'center'
  },
  link:{
      textDecoration:'None'
  }
}));



const UserNoticeItem = observer( (props) => {
    const classes = useStyles();
    const text = props.text
    const date = props.date
    const link = props.link

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
            <Link href={link} underline='none'>
                <ListItem button>
                    <div className={classes.textField}>
                        <ListItemText classes={{primary:classes.text}} primary={text}/>
                        <ListItemText classes={{primary:classes.date}} primary={date} bold/>
                    </div>
                </ListItem>
            </Link>
                <div className={classes.iconField}>
                <IconButton>
                        <ClearIcon/>
                </IconButton>
                </div>
            </div>
        </div>
    );
  }
)

export default UserNoticeItem