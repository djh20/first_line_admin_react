import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadAllReplies from "../controllers/ReplyController";
import requestReadReplies,{requestPostReply} from "../controllers/ReplyController";


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
    readReplies(post_id){
        requestReadReplies(post_id).then(result=>{
            this.replies = [...this.replies,...result]
            console.log(this.replies)
        })
    }
}

export default ReplyStore = ReplyStore.getInstance();