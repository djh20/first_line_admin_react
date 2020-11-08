import axios from 'axios'
import Notice from '../models/Notice'
export default async function readNotices(condition, query){
    return await axios.get(
        `/api/notice/manage/`, {params:{ condition :  condition, query : query}},
        {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ // 5-2
            var tmp = result.data.data
            Object.keys(tmp).map((key,index) => (
                data.push(new Notice(tmp[key]['notice_id'],
                tmp[key]['receiver_id'],tmp[key]['sender_id'],
                tmp[key]['text'],tmp[key]['send_datetime'],
                tmp[key]['is_read']
                ).getDic())
            ))
            return [data, result.data.currentPage, result.data.totalPage]
        }
        return []
    });
}


export async function requestCreateNotice(_receiver_id, _sender_id, _text){
    return await axios.post('/api/notice/manage/', 
    {
        receiver_id: _receiver_id,
        sender_id: _sender_id,
        text: _text
    },{withCredentials: true}
    ).catch(result => {return result}).then(result=>{
        return result
    })

}