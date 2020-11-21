import { observable, action} from 'mobx';
import {createContext} from "react";
import requestReadLoginLog , {requestSearchLoginLog} from "../controllers/LoginLogController"
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

    const codeTable = {"전체":0,'요청자 ip':1,'아이디':2,'로그인 날짜 (이후)':3,'로그인 날짜 (이전)':4,'로그인 결과':5}
    return requestSearchLoginLog(codeTable[code],query).then(result=>{
      this.loginLogs = [...result]
    })
  }

}

export default  LoginLogStore = LoginLogStore.getInstance()