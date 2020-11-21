import axios from 'axios'
import Log from '../models/Log'

export default async function requestReadLog(){ 
    return await axios.get(
        '/api/log/manage/', {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ 
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push((new Log(tmp[key]['log_id'],tmp[key]['requester_ip']
                ,tmp[key]['requester_id'],tmp[key]['request_method'],tmp[key]['url']
                ,tmp[key]['logging_date'],tmp[key]['result_code'],tmp[key]['result_code_detail']
                )).get_dic())
            ))
            console.log(data)
            return data
        }
        return []
    });
}

export async function requestSearchLoginLog(_code,_query) {
    return await axios.get(
        '/api/log/manage/', {params:{ code :  _code, query : _query}}, {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ 
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push((new Log(tmp[key]['log_id'],tmp[key]['requester_ip']
                ,tmp[key]['requester_id'],tmp[key]['request_method'],tmp[key]['url']
                ,tmp[key]['logging_date'],tmp[key]['result_code'],tmp[key]['result_code_detail']
                )).get_dic())
            ))
            console.log(data)
            return data
        }
        return []
    });
}