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
import {Link} from 'react-router-dom';
import NoticeButton from '../components/common/NoticeButton'
import LogoutButton from '../components/common/LogoutButton'
import CreateIcon from '@material-ui/icons/Create';
import RateReviewIcon from '@material-ui/icons/RateReview';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import ReportIcon from '@material-ui/icons/Report';
import StorageIcon from '@material-ui/icons/Storage';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RouterIcon from '@material-ui/icons/Router';
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
                         <LogoutButton removeCookie={removeCookie}  setHasCookie={setHasCookie} />
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
                        <Link   
                         to={{
                            pathname: "/memberManage",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><Home /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>회원 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/postManage",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><CreateIcon /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>게시글 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/replyManage",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><RateReviewIcon /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>댓글 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/noticeManage",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><NotificationsNoneIcon /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>알림 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/keywordManage",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><FontDownloadIcon /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>키워드 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/reportManage",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><ReportIcon /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>신고 관리</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/log",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><StorageIcon /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>로그 조회</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/loginLogManage",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><VpnKeyIcon /></ListItemIcon>                            
                                <ListItemText className={classes.listItemText}>로그인 로그 조회</ListItemText>
                        </ListItem>
                        </Link>
                        <Link   
                         to={{
                            pathname: "/traffic",
                        }}
                        onClick={() => setState(!open)}
                        style={{ textDecoration: 'none' }}
                        >
                        <ListItem button>
                            <ListItemIcon><RouterIcon /></ListItemIcon>                            
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