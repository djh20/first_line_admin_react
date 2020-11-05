import axios from 'axios'
import Notice from '../models/Notice'
export default async function readNotices(param){
    return await axios.get(
        `/api/notice/manage/`, {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ // 5-2
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push(new Notice(tmp[key]['notice_id'],
                tmp[key]['receiver_id'],tmp[key]['sender_id'],
                tmp[key]['text'],tmp[key]['send_datetime'],
                tmp[key]['is_read']
                ))
            ))
            return data
        }
        return []
    });
}