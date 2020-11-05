import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadNotices from '../controllers/NoticeController'

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
    readNotices(param)
    {
        return requestReadNotices(param).then(result=>{
            this.notices = [...result]
        })
    }
}

export default NoticeStore = NoticeStore.getInstance();