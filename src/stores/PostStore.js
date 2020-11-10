import { observable, action} from 'mobx';
import {createContext} from "react";
import requestReadAllPost, {reaquestDeletePost, search} from "../controllers/PostController"
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

    const codeTable = {"제목":0,"게시글 번호 (이상)":1,'게시글 번호 (이하)':2,'조회수':3,'좋아요 (이상)':4, '좋아요 (이하)':5,'댓글 수 (이상)':6, '댓글 수 (이하)':7,
    '태그':8,'작성자':9,'작성일 (이후)':10,'작성일 (이전)':11, '수정일(이후)':12,'수정일(이전)':13,'온도 (이상)':14,'온도 (이하)':15, "키워드":16, 
    "P/DP (이상)":17, "P/DP (이하)":18, "A/DA(이상)":19, "A/DA(이하)":20, '욕설 확률 (이상)':21,'욕설 확률 (이하)':22, "삭제 여부":23, "블라인드 여부":24}

    return requestSearchPost(codeTable[code], query, pageNo).then(result=>{
      this.posts = [...result]
    })
  }

  @action
  deletePost(post_id){
    console.log(post_id)
    return reaquestDeletePost(post_id).then(result=>{
      if(result==200)
        return true
      else
        return false
    })
  }

  @action
  blindPost(post_id){
    console.log(post_id)
    return reaquestBlindPost(post_id).then(result=>{
      if(result==200)
        return true
      else
        return false
    })
  }
}

export default  PostStore = PostStore.getInstance() // 4-5