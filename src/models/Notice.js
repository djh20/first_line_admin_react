export default class Notice{
    constructor(notice_id, receiver_id, sender_id, text, send_datetime, is_read){
        this.notice_id = notice_id,
        this.receiver_id = receiver_id,
        this.sender_id = sender_id,
        this.text = text,
        this.send_datetime = send_datetime,
        this.is_read = is_read
    }
}

