import React, {useContext} from 'react';
import UserHomeLayout from './layout/UserHomeLayout';
import {makeStyles} from '@material-ui/core';
import "./App.css"
import PostManageView from './components/post/PostManageView'
import ReplyManageView from './components/reply/ReplyManageView'
import NoticeManageView from './components/notice/NoticeManageView'
import ReportManageView from './components/report/ReportManageView'
import KeywordManageView from './components/keyword/KeywordManageView'
import MemberManageView from './components/member/MemberManageView'
import SignInView from './components/member/SignInView'
import LoginLogManageView from './components/log/LoginLogManageView'
import LogManageView from './components/log/LogManageView'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {observer} from "mobx-react"
import {useCookies} from 'react-cookie'
import CommonSnackbar from './components/common/CommonSnackbar'
import TrafficManageView from './components/traffic/TrafficManageView'
const useStyle = makeStyles(theme=>({
    '@global': {
        'body, html' : {
          padding : 0,
          margin : 0,
          background: '#2a2a40',
          minWidth: '100vw',
          minHeight: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh'
        },
        '*::-webkit-scrollbar': {
          width: '0.5rem',
          backgroundColor: '#2a2a40',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#eabc28',
          outline: '1px solid slategrey'
        },
        '*::-webkit-scrollbar:horizontal': {
            display:'none'
          },
        background:'#2a2a40',
      },
    root : {
        background : '#2a2a40',
        width : "100%",
        height : "100%",
        padding : "2% 2% 2% 2%",
        margin : 0,
        overflowY: 'hidden',
        background: '#2a2a40'
    },
}))


const App = observer( () =>  {
  const classes = useStyle();
  const [cookies, setCookie,removeCookie] = useCookies(['jwt'])
  const [hasCookie,setHasCookie] = React.useState(false)
  React.useEffect(()=>{
    if(cookies['jwt'] != undefined)
        setHasCookie(true)
    console.log(cookies)
})
  return (
        <div className={classes.root}>
          <Router>
          {
            hasCookie == false ? <SignInView setHasCookie={setHasCookie}></SignInView> :
            (
              <UserHomeLayout cookies={cookies} hasCookie={hasCookie} setHasCookie={setHasCookie} removeCookie={removeCookie} hasCookie={hasCookie}>
                  <Switch>
                      <Route exact path="/replyManage" component={ReplyManageView}/>
                      <Route exact path="/noticeManage" component={NoticeManageView}/> 
                      <Route exact path="/reportManage" component={ReportManageView}/> 
                      <Route exact path="/postManage" component={PostManageView}/>
                      <Route exact path="/memberManage" component={MemberManageView}/>
                      <Route exact path="/keywordManage" component={KeywordManageView}/>
                      <Route exact path="/log" component={LogManageView}/>
                      <Route exact path="/loginLogManage" component={LoginLogManageView}/>
                      <Route exact path="/traffic" component={TrafficManageView}/>
                  </Switch>
              </UserHomeLayout>
            )
          }
          </Router>
          <CommonSnackbar/>
        </div>
  );
})

export default App;
