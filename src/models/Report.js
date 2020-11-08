export default class Reply{
    constructor(report_id,report_text,process_text,report_date,process_date,report_writer,process_writer,is_processed,reply_id,post){
        this.report_id = report_id
        this.report_text = report_text
        this.process_text = process_text
        this.report_date = report_date
        this.process_date = process_date
        this.report_writer = report_writer
        this.process_writer = process_writer
        this.is_processed = is_processed
        this.reply = reply_id
        this.post = post
    }

    getDic(){
        return{
            id : this.report_id,
            report_text : this.report_text,
            process_text : this.process_text,
            report_date : this.report_date,
            process_date : this.process_date,
            report_writer : this.report_writer,
            process_writer: this.process_writer,
            is_processed : this.is_processed,
            reply : this.reply,
            post : this.post,
            detail : {'report_text' : this.report_text, 'report_id' : this.report_id, process_text : this.process_text},
            process : this.report_id
        }
    }
}
