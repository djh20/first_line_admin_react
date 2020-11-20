import axios from 'axios'
import LoginLog from '../models/LoginLog'

export default async function requestReadLoginLog(){ 
    return await axios.get(
        '/api/log/manage/login/', {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ 
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push((new LoginLog(tmp[key]['login_log_id'],tmp[key]['requester_ip']
                ,tmp[key]['login_id'],tmp[key]['logging_date'],tmp[key]['login_result']
                )).get_dic())
            ))
            console.log(data)
            return data
        }
        return []
    });
}

