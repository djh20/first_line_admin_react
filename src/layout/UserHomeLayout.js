import React, { Component, useState, useEffect } from 'react';
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core';
import { Menu, ChevronLeft, Home, Inbox, Mail } from '@material-ui/icons';
import Link from '@material-ui/core/Link';
import AccountButton from '../components/common/AccountButton'
import NoticeButton from '../components/common/NoticeButton'
import UserInfoPopOver from "../components/member/UserInfoPopOver"

const useStyle = makeStyles(theme=>({
    root:{
        width:'100%',
        height:'100%',
    },
    title : {
        fontSize :"1.5rem",
        fontStyle : 'solid',
        color : '#eabc28',
        flexGrow: 1,
    },
    listItemText :{
        fontSize : "2rem",
        fontStyle : 'solid',
        color : 'black'
    },
    toolBar:{
        position:"fixed",
        width:"100%",
        height: '7vh',
    },
    appBar:{
        width : "100%",
        height : "7%",
        transition : "all 0.2s",
        background : "#2a2a40"
    },
    drawer:{
        "@media (min-device-width: 481px)": { // PC
            width : '20vw'
          },
        "@media (min-device-width: 320px) and (max-device-width: 480px)": { // Mobile
            width : '70vw'  
        }
    },
    accountIconArea:{
        marginRight:'2%'
    },
    drawerIconArea:{
        display: 'flex', 
        justifyContent: 'flex-end'
    },
    contentArea:{
        width: '96vw',
        minHeight:'93vh',
        background:"#2a2a40", 
        marginTop:'7vh', 
        position:'sticky',
    },
}))


function UserHomeLayout(props){
    
    const { children } = props;
    const [open, setState] = useState(false);
    const classes = useStyle();
    const cookies = props.cookies
    console.log(cookies)
    const setHasCookie = props.setHasCookie
    const removeCookie = props.removeCookie
    const hasCookie = props.hasCookie
    return(
         <div className={classes.root}>
            <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar className={classes.toolBar} alignItems="flex-end" position="fixed">
                    <IconButton edge="start" color="inherit" aria-label="Menu" onClick={() => setState(!open)}>
                        <Menu />
                    </IconButton>
                    <div className={classes.title}>
                         첫 줄 관리자
                    </div>
                    <div alignSelf="flex-end" className={classes.accountIconArea}>
                        <NoticeButton />
                         <AccountButton removeCookie={removeCookie}  setHasCookie={setHasCookie} />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer open={open} className={classes.drawer}>
                <div className={classes.drawer}>
                    <div className={classes.drawerIconArea}>
                        <IconButton onClick={() => setState(!open)}>
                            <ChevronLeft />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link  href='/memberManage'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>회원 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/postManage'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>게시글 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/replyManage'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>댓글 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/noticeManage'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>알림 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/keywordManage'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>키워드 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/reportManage'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>신고 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/log'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>로그 조회</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/loginLogManage'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>로그인 로그 조회</ListItemText>
                        </ListItem>
                        </Link>
                        <Link  href='/traffic'>
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>트래픽 통계</ListItemText>
                        </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
            <div className={classes.contentArea}>
                        {children}
            </div>
    </div>
    );
}

export default UserHomeLayout;