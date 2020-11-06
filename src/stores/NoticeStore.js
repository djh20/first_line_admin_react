import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadNotices from '../controllers/NoticeController'

class NoticeStore {
    @observable notices = []
    @observable currentPage = 1
    @observable totalPage = 0
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
    readNotices(condition, query)
    {
        return requestReadNotices(condition, query).then( ([notices, currentPage, totalPage]) =>{
            this.notices = [...notices]
            this.currentPage = currentPage
            this.totalPage = totalPage
        })
    }
}

export default NoticeStore = NoticeStore.getInstance();