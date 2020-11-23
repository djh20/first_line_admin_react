export default class Log{
    constructor(log_id , requester_ip,requester_id, request_method, url, logging_date, result_code, result_code_detail){
        this.log_id = log_id
        this.requester_ip = requester_ip
        this.requester_id = requester_id
        this.request_method  = request_method
        this.url  = url
        this.logging_date  = logging_date
        this.result_code  = result_code
        this.result_code_detail  = result_code_detail
    }
    get_dic()
    {
        return {
            id : this.log_id,
            requester_ip : this.requester_ip,
            requester_id : this.requester_id,
            request_method : this.request_method,
            url : this.url,
            logging_date : this.logging_date,
            result_code : this.result_code,
            result_code_detail : this.result_code_detail,
            detail : {'id' : this.log_id,'requester_ip' : this.requester_ip,'requester_id' : this.requester_id, 'request_method' : this.request_method,'url' : this.url,
            'logging_date': this.logging_date , 'result_code' : this.result_code,'result_code_detail' : this.result_code_detail}
        }
    }
}