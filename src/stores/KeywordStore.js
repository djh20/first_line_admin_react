import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadKeywords, {requestCreateKeyword} from '../controllers/KeywordController'

class KeywordStore {
    @observable keywords = []
    static instance = null;

    static getInstance() {
        if (!KeywordStore.instance) 
            this.instance = new KeywordStore();
        return KeywordStore.instance;

    }
    constructor() {
        this.context = createContext(this);
    }


    @action
    createKeyword(receiver_id, sender_id, text){
        return requestCreateKeyword(receiver_id, sender_id, text).then( result => {
            return result;
        })
    }

    @action
    readKeywords(condition, query)
    {
        return requestReadKeywords(condition, query).then( (keywords) =>{
            this.keywords = [...keywords]
        })
    }
}

export default KeywordStore = KeywordStore.getInstance();