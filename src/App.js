import React, {useContext} from 'react';
import UserHomeLayout from './layout/UserHomeLayout';
import {makeStyles} from '@material-ui/core';
import PostUserView from './components/post/PostUserView'
import PostEditor from './components/post/PostEditor'
import "./App.css"
import PostManageView from './components/post/PostManageView'
import ReplyManageView from './components/reply/ReplyManageView'
import NoticeManageView from './components/notice/NoticeManageView'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {observer} from "mobx-react"

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
          width: '0.1rem',
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
  return (
        <div className={classes.root}>
            <Router>
            <UserHomeLayout>
                <Switch>
                    <Route exact path="/replyManage" component={ReplyManageView}/>
                    <Route exact path="/noticeManage" component={NoticeManageView}/> 
                    <Route exact path="/postManage" component={PostManageView}/>
                </Switch>
            </UserHomeLayout>
            </Router> 
        </div>
  );
})

export default App;
