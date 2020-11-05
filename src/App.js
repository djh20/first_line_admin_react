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
