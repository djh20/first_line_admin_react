import axios from 'axios'
import Post from '../models/Post'

export default async function requestReadAllPost(){ // 5-1
    return await axios.get(
        `/api/post/manage/`, {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ // 5-2
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push(new Post(tmp[key]['post_id'], tmp[key]['title'],
                tmp[key]['text'],tmp[key]['like'],tmp[key]['num_reply'],
                tmp[key]['tag'],tmp[key]['writer'],
                tmp[key]['writing_date'],tmp[key]['edting_date'],
                tmp[key]['temperature'],tmp[key]['keyword'],tmp[key]['prob_p_dp']
                ,tmp[key]['prob_a_da'],tmp[key]['prob_is_slang'],tmp[key]['is_deleted']
                ,tmp[key]['is_blinded']
                ))
            ))

            return data
        }
        return []
    });
}

export function readPost(){ // 5-1
    console.log("haha")
}
