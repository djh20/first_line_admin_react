import { observable, action} from 'mobx';
import {createContext} from "react";
import requestReadAllPost, {search} from "../controllers/PostController"
class PostStore{
  @observable posts = [] // 4-3
  static instance = null; // 4-1
  
  static getInstance () { // 4-1
    if (!PostStore.instance) 
      this.instance = new PostStore();
    return PostStore.instance;
  }
  constructor(){
    this.context = createContext(this) // 4-2 
  }
  @action 
  readAll(){
    requestReadAllPost().then(result =>{ // 4-4
      this.posts = [...this.posts, ...result]
    })
  }
  @action
  search(code, query, pageNo) {
    console.log(code)
    console.log(query)
    console.log(pageNo)

    const codeTable = {'게시글 번호':0,'제목':1,'좋아요':2,'댓글 수':3,'태그':4,'작성자':5,'작성일':6,'수정일':7,'온도':8, "키워드":9, "P/DP":10, "A/DA":11, "욕설 확률":12, "삭제 여부":13, "블라인드 여부":14}
    return search(codeTable[code], query, pageNo).then(result=>{
      this.posts = [...result]
    })
  }
}

export default  PostStore = PostStore.getInstance() // 4-5