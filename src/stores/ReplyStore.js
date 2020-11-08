import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadNotices, {requestCreateNotice} from '../controllers/NoticeController'

class NoticeStore {
    @observable notices = []
    static instance = null;

    static getInstance() {
        if (!NoticeStore.instance) 
            this.instance = new NoticeStore();
        return NoticeStore.instance;

    }
    constructor() {
        this.context = createContext(this);
    }


    @action
    createNotice(receiver_id, sender_id, text){
        return requestCreateNotice(receiver_id, sender_id, text).then( result => {
            return result;
        })
    }

    @action
    readNotices(condition, query)
    {
        return requestReadNotices(condition, query).then( (notices) =>{
            this.notices = [...notices]
        })
    }
}

export default NoticeStore = NoticeStore.getInstance();