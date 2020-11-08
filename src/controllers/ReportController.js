import axios from 'axios'
import Report from '../models/Report'
export default async function requestReadReports(_condition, _query){
    return await axios.get(
        `/api/report/manage/`, {params:{ condition :  _condition, query : _query}},
        {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ // 5-2
            var tmp = result.data.data
            Object.keys(tmp).map((key,index) => (
                data.push(new Report(tmp[key]['report_id'],
                tmp[key]['report_text'],tmp[key]['process_text'],
                tmp[key]['report_date'],tmp[key]['process_date'],
                tmp[key]['report_writer'],tmp[key]['process_writer'],
                tmp[key]['is_processed'],tmp[key]['reply'],
                tmp[key]['post']
                ).getDic())
            ))
            console.log(data)
            return data
        }
        return []
    });
}

export async function requestReadReport(_reply_id){
    return await axios.get(
        `/api/report/` + _reply_id + '/',
        {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        if(result.data != null){ // 5-2
            var tmp = result.data.data
                return (new Report(tmp['report_id'],
                tmp['report_text'],tmp['process_text'],
                tmp['report_date'],tmp['process_date'],
                tmp['report_writer'],tmp['process_writer'],
                tmp['is_processed'],tmp['reply'],
                tmp['post']
                ).getDic())
        }
        return null
    });
}


export async function requestCreateReport(_receiver_id, _sender_id, _text){
    return await axios.post('/api/notice/manage/', 
    {
        receiver_id: _receiver_id,
        sender_id: _sender_id,
        text: _text
    },{withCredentials: true}
    ).catch(error => {return error.response}).then(result=>{
        return result
    })

}