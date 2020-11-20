import { observable, action} from 'mobx';
import {createContext} from "react";
import requestReadLoginLog from "../controllers/LoginLogController"
class LoginLogStore{
  @observable loginLogs = [] // 4-3
  static instance = null; // 4-1
  
  static getInstance () { // 4-1
    if (!LoginLogStore.instance) 
      this.instance = new LoginLogStore();
    return LoginLogStore.instance;
  }
  constructor(){
    this.context = createContext(this) // 4-2 
  }
  @action 
  readLoginLog(){
    requestReadLoginLog().then(result =>{ // 4-4
      this.loginLogs = [...result]
      console.log(result)
      
    })
  }
  
  @action
  searchLoginLog(code, query) {

    const codeTable = {"제목":4,"게시글 번호 (이상)":5,'게시글 번호 (이하)':6,'조회수 (이상)':7,'조회수 (이하)':8}

    return requestSearchLoginLog(codeTable[code],query).then(result=>{
      this.loginLogs = [...result]
    })
  }

}

export default  LoginLogStore = LoginLogStore.getInstance()