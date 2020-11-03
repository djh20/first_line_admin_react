import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadAllReplies from "../controllers/ReplyController";
import requestReadReplies,{requestPostReply, search} from "../controllers/ReplyController";


class ReplyStore {
    @observable replies = []
    static instance = null;

    static getInstance() {
        if (!ReplyStore.instance) 
            this.instance = new ReplyStore();
        return ReplyStore.instance;

    }
    constructor() {
        this.context = createContext(this);
    }

    @action
    readAllReplies()
    {
        return requestReadAllReplies().then(result=>{
            this.replies = [...this.replies,...result]
            console.log(this.replies)
        })
    }

    @action
    postReply(post_id,text){
        return requestPostReply(post_id,text).then(result=>{
            if(result == 200)
                return true
            else
                return false
                
        })
    }

    @action
    search(code, query, pageNo) {
      console.log(code)
      console.log(query)
      console.log(pageNo)
  
      const codeTable = {'댓글 번호':0,'게시글 번호':1,'내용':2,'작성자':3,'작성일':4,'수정일':5,'욕설 확률':6,'삭제 여부':7,'블라인드 여부':8}
      return search(codeTable[code], query, pageNo).then(result=>{
        this.replies = [...result]
      })
    }

    @action
    readReplies(post_id){
        requestReadReplies(post_id).then(result=>{
            this.replies = [...this.replies,...result]
            console.log(this.replies)
        })
    }
}

export default ReplyStore = ReplyStore.getInstance();