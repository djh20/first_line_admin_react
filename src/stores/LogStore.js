import { observable, action} from 'mobx';
import {createContext} from "react";
import requestReadLog from "../controllers/LogController"
class LogStore{
  @observable logs = [] // 4-3
  static instance = null; // 4-1
  
  static getInstance () { // 4-1
    if (!LogStore.instance) 
      this.instance = new LogStore();
    return LogStore.instance;
  }
  constructor(){
    this.context = createContext(this) // 4-2 
  }
  @action 
  readLog(){
    requestReadLog().then(result =>{ // 4-4
      this.logs = [...result]
      console.log(result)
      
    })
  }
  
  @action
  searchLog(code, query) {

    const codeTable = {"전체":0,"로그 번호 (이상)":1,'로그 번호 (이하)':2,'요청자 ip':3,'요청자 id':4,'요청 종류':5,'요청 경로':6,
    '요청 시간 (이후)':7,'요청 시간 (이전)':7,'수신 코드':8,'수신 코드 내용':9}
    
    return requestSearchLoginLog(codeTable[code],query).then(result=>{
      this.logs = [...result]
    })
  }

}

export default  LogStore = LogStore.getInstance()