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

    const codeTable = {"전체":0,"로그 번호 (이상)":1,'로그 번호 (이하)':2,'요청자 ip':3,'아이디':4,'로그인 날짜 (이후)':5,'로그인 날짜 (이전)':6,'로그인 결과':7}
    return requestSearchLoginLog(codeTable[code],query).then(result=>{
      this.loginLogs = [...result]
    })
  }

}

export default  LoginLogStore = LoginLogStore.getInstance()