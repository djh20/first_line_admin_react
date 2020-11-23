export default class LogingLog{
    constructor(login_log_id , requester_ip, login_id, logging_date, login_result){
        this.login_log_id = login_log_id
        this.requester_ip = requester_ip
        this.login_id  = login_id
        this.logging_date  = logging_date
        this.login_result  = login_result
    }
    get_dic()
    {
        return {
            id : this.login_log_id,
            requester_ip : this.requester_ip,
            login_id : this.login_id,
            logging_date : this.logging_date,
            login_result : this.login_result,
            detail : {'id' : this.login_log_id,'requester_ip' : this.requester_ip, 'login_id' : this.login_id,'logging_date' : this.logging_date,
            'login_result' : this.login_result}
        }
    }
}