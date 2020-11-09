import { observable, action } from 'mobx';
import {createContext} from "react";
import requestLogin from '../controllers/MemberController'
class MemberStore{
  @observable count = 0;
  static instance = null;

  static getInstance () {
    if (!MemberStore.instance) 
      this.instance = new MemberStore();
    return MemberStore.instance;
  }
  constructor(){
    this.context = createContext(this)
  }
  @action increase = () => {
    this.count++;
  }

  @action 
  async login(id, pw){
    return requestLogin(id,pw)
  }
}
export default  MemberStore = MemberStore.getInstance()