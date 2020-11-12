import { observable, action } from 'mobx';
import {createContext} from "react";
import cookie from 'react-cookies'
import axios from 'axios'
import requestReadAllMembers, {requestDeleteMember,requestEditMember, requestSearchMember} from "../controllers/MemberController"
class MemberStore{
  @observable members = []
  static instance = null;

  static getInstance () {
    if (!MemberStore.instance) 
      this.instance = new MemberStore();
    return MemberStore.instance;
  }
  constructor(){
    this.context = createContext(this)
  }
  @action logout = () => {
    cookie.remove("jwt")
  }
  @action
  readAllMembers()
  {
      return requestReadAllMembers().then(result=>{
          this.members = [...result]
      })
  }

  @action
  deleteMember(member){
      return requestDeleteMember(member).then(result=>{
      if(result==200)
          return true
      else
          return false
      })
  }
  @action
  editMember(member){
      return requestDeleteMember(member).then(result=>{
      if(result==200)
          return true
      else
          return false
      })
  }
  @action
  searchMember(code, query) {

    const codeTable = {'아이디':0,'비밀번호':1,"필명":2,"나이 (이상)":3, '나이 (이하)':4,'성별':5,'권한':6,
      '휴대폰 번호':7, '이메일':8}
    return requestSearchMember(codeTable[code], query).then(result=>{
      this.replies = [...result]
    })
  }
  @action 
  async login(id, pw){
    return await axios.post(
      '/api/member/login/', 
      {id : id ,pw : pw})
      .then(
        function (response) {
          console.log(response.status)
          if(response.status == 410)
            return false;
          else{
            cookie.save("jwt",response.data['jwt'])
            console.log("true")
            return true
          }
    }).catch(error => {console.log('error : ',error.response)});
  }
  
}
export default  MemberStore = MemberStore.getInstance()