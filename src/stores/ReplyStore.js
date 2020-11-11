import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadAllReplies from "../controllers/ReplyController";
import requestReadReplies,{requestPostReply, requestDeleteReply, requestBlindReply, search} from "../controllers/ReplyController";


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
            this.replies = [...result]
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
  
      const codeTable = {'댓글 번호 (이상)':0,'댓글 번호 (이하)':1,"게시글 번호 (이상)":2,"게시글 번호 (이하)":3, '내용':4,'작성자':5,'작성일 (이후)':6,
        '작성일 (이전)':7, '수정일(이후)':8,'수정일(이전)':9,'욕설 확률 (이상)':10,'욕설 확률 (이하)':11,'삭제 여부':12,'블라인드 여부':13}
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

        @action
    deleteReply(reply_id){
        console.log(reply_id)
        return requestDeleteReply(reply_id).then(result=>{
        if(result==200)
            return true
        else
            return false
        })
    }

    @action
    blindReply(reply_id){
        console.log(reply_id)
        return requestBlindReply(reply_id).then(result=>{
        if(result==200)
            return true
        else
            return false
        })
    }

}

export default ReplyStore = ReplyStore.getInstance();