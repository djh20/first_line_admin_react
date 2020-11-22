import { observable, action} from 'mobx';
import {createContext} from "react";
import requestReadAllPost, {requestDeletePost,requestBlindPost, requestSearchPost} from "../controllers/PostController"
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
      this.posts = [...result]
      
    })
  }
  
  @action
  searchPost(code, query) {

    const codeTable = {"제목":4,"게시글 번호 (이상)":5,'게시글 번호 (이하)':6,'조회수 (이상)':7,'조회수 (이하)':8,'좋아요 (이상)':9, '좋아요 (이하)':10,'댓글 수 (이상)':11, '댓글 수 (이하)':12,
    '태그':13,'작성자':14,'작성일 (이후)':15,'작성일 (이전)':16, '수정일(이후)':17,'수정일(이전)':18,'온도 (이상)':19,'온도 (이하)':20, "키워드":21, 
    "P/DP (이상)":22, "P/DP (이하)":23, "A/DA(이상)":24, "A/DA(이하)":25, '욕설 확률 (이상)':26,'욕설 확률 (이하)':27, "삭제 여부":28, "블라인드 여부":29,"내용":30}

    return requestSearchPost(codeTable[code],query).then(result=>{
      this.posts = [...result]
    })
  }

  @action
  deletePost(post){
    return requestDeletePost(post).then(result=>{
      console.log(result)
      return result
    })
  }

  @action
  blindPost(post){
    return requestBlindPost(post).then(result=>{
      return result
    })
  }
}

export default  PostStore = PostStore.getInstance() // 4-5