import axios from 'axios'
import Reply from '../models/Reply'
import cookie from 'react-cookies'

export default async function requestReadReplies(_post_id){ 
    return await axios.get(
        '/api/reply/manage/', {params:{ post_id :  _post_id}},{withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ 
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push(new Reply(tmp[key]['reply_id'],tmp[key]['text'],tmp[key]['writer']
                ,tmp[key]['writing_date']))
            ).get_dic())
            console.log(data)
            return data
        }
        return []
    });
}

export async function requestReadAllReplies(){ 
    return await axios.get(
        '/api/reply/manage/', {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ 
            var tmp = result.data
            Object.keys(tmp).map((key,index) => (
                data.push(new Reply(tmp[key]['reply_id'],tmp[key]['text'],tmp[key]['writer']
                ,tmp[key]['writing_date']))
            ))
            console.log(data)
            return data
        }
        return []
    });
}

export async function requestPostReply(_post_id, _text)
{
    console.log(_post_id)
    console.log(_text)
    console.log(cookie.load("jwt"))
    return await axios.post('/api/reply/',{ 
        post_id : _post_id,
        text : _text},{ withCreadentials: true }
        ).catch(err => console.warn(err)).then(res => { return res.status})
}

export async function search(code, query, pageNo){
    return []
}

export async function requestSearchReply(code, query, pageNo){
    return await axios.get(
        'api/post/manage/',{code : code, query : query, pageNo : pageNo}
    )
}

export async function reaquestDeleteReply(reply_id){
    return await axios.delete(
        'api/post/manage/',{reply_id : reply_id}, {withCredentials : true}).catch(err => console.warn(err)).then(res => {return res.status})
}

export async function reaquestBlindReply(reply_id){
    return await axios.post(
        'api/post/manage/blind/',{reply_id : reply_id} , {withCredentials : true}).catch(err => console.warn(err)).then(res => {return res.status})
}