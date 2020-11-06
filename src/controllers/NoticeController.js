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
                ))
            ))
            return [data, result.data.currentPage, result.data.totalPage]
        }
        return []
    });
}