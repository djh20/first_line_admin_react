import axios from 'axios'
import Post from '../models/Post'

export default async function requestReadAllPost(){ // 5-1
    return await axios.get(
        '/api/post/manage/', {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ // 5-2
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push((new Post(tmp[key]['post_id'], tmp[key]['title'],
                tmp[key]['num_lookup'],tmp[key]['text'],tmp[key]['num_reply'],
                tmp[key]['tag'],tmp[key]['writer'],
                tmp[key]['writing_date'],tmp[key]['edting_date'],
                tmp[key]['temperature'],tmp[key]['keyword'],tmp[key]['prob_p_dp']
                ,tmp[key]['prob_a_da'],tmp[key]['prob_is_slang'],tmp[key]['is_deleted']
                ,tmp[key]['is_blinded'],tmp[key]['num_good']
                )).get_dic())
            ))
            return data
        }
        return []
    });
}

export async function requestSearchPost(_code, _query){
    return await axios.get(
        `/api/post/manage/`, {params:{ code :  _code, query : _query}},
        {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ // 5-2
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push((new Post(tmp[key]['post_id'], tmp[key]['title'],
                tmp[key]['num_lookup'],tmp[key]['text'],tmp[key]['num_reply'],
                tmp[key]['tag'],tmp[key]['writer'],
                tmp[key]['writing_date'],tmp[key]['editing_date'],
                tmp[key]['temperature'],tmp[key]['keyword'],tmp[key]['prob_p_dp']
                ,tmp[key]['prob_a_da'],tmp[key]['prob_is_slang'],tmp[key]['is_deleted']
                ,tmp[key]['is_blinded'],tmp[key]['num_good']
                )).get_dic())
            ))
            return data
        }
        return []
    });
}


export async function requestDeletePost(post){
    return await axios({method:'DELETE',url:'api/post/manage/', data:{post : post}, withCredentials : true}).catch(err => {console.log(err); return err.response}).then(res => {return res})
}

export async function requestBlindPost(post){
    return await axios.post('api/post/manage/blind/',{post: post}, {withCredentials: true}).catch(err => {console.log(err); return err.response}).then(res => {console.log(res); return res})
}