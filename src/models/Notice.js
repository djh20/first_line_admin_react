export default class Notice{
    constructor(notice_id, receiver_id, sender_id, text, send_datetime, is_read, source_url){
        this.notice_id = notice_id,
        this.receiver_id = receiver_id,
        this.sender_id = sender_id,
        this.text = text,
        this.send_datetime = send_datetime,
        this.is_read = is_read,
        this.source_url = source_url
    }

    getDic(){
        return{
            id : this.notice_id,
            receiver_id : this.receiver_id,
            sender_id : this.sender_id,
            text : this.text,
            send_datetime : this.send_datetime,
            is_read : this.is_read,
            source_url : this.source_url
        }
    }
}


export class MyNotice{
    constructor(notice_id, text, send_datetime, source_url){
        this.notice_id = notice_id,
        this.text = text,
        this.send_datetime = send_datetime,
        this.source_url = source_url

    }
    getDic(){
        return{
            notice_id : this.notice_id,
            text : this.text,
            send_datetime : this.send_datetime,
            source_url : this.source_url
        }
    }
}
