import { observable, action} from 'mobx';
import {createContext} from "react";
import requestReadLog,{requestSearchLog}  from "../controllers/LogController"
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

    const codeTable = {"전체":0,'요청자 ip':1,'요청자 id':2,'요청 종류':3,'요청 경로':4,
    '요청 시간 (이후)':5,'요청 시간 (이전)':6,'수신 코드':7,'수신 코드 내용':8}
    
    return requestSearchLog(codeTable[code],query).then(result=>{
      this.logs = [...result]
    })
  }

}

export default  LogStore = LogStore.getInstance()