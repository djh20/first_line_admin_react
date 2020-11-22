import { observable, action } from 'mobx';
import {createContext} from "react";
import axios from 'axios'
import requestReadAllMembers, {requestDeleteMember,requestEditMember, requestSearchMember, requestLogin,requestChangePw} from "../controllers/MemberController"
import Member from "../models/Member"
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
        return result
      })
  }
  @action 
  createMember(id,name,nickname,age,gender,authority,phonenumber,email){
      const newMember = new Member(id,name,nickname,age,gender,authority,phonenumber,email)
      return requestEditMember(newMember).then( 
        result => { return result
    })
  }
  @action
  searchMember(code, query) {
    const codeTable = {'아이디':0,'필명':1,"나이 (이상)":2,"나이 (이하)":3, '성별':4,'권한':5,'휴대폰 번호':6,'이메일':7,}
    return requestSearchMember(codeTable[code], query).then(result=>{
      this.members = [...result]
    })
  }  

  @action 
  async login(id, pw){
    return requestLogin(id,pw).then(
      (result) => {
        return result
      }
    )
  }

  @action 
  changePw(id)
  {
    return requestChangePw(id).then(
      (result) => {return result}
    )
  }
}
export default  MemberStore = MemberStore.getInstance()