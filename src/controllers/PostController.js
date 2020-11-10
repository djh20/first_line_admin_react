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
                ,tmp[key]['is_blinded'],tmp[key]['num_lookup']
                ).get_dic())
            ))

            return data
        }
        return []
    });
}

export function readPost(){ // 5-1
    console.log("haha")
}

export async function requestSearchPost(code, query, pageNo){
    return await axios.get(
        'api/post/manage',{code : code, query : query, pageNo : pageNo}
    )
}

export async function reaquestBlindPost(post_id){
    return await axios.delete(
        'api/post/manage/',{post_id : post_id}, {withCredentials : true}).catch(err => console.warn(err)).then(res => {return res.status})
}

export async function reaquestDeletePost(post_id){
    return await axios.post(
        'api/post/manage/blind',{post_id : post_id} , {withCredentials : true}).catch(err => console.warn(err)).then(res => {return res.status})
}