import axios from 'axios'
import Keyword from '../models/Keyword'
export default async function readKeywords(_condition, _query){
    return await axios.get(
        `/api/keyword/manage/`, {params:{ condition :  _condition, query : _query}},
        {withCredentials: true}
    ).catch(error => {return [] }).then(result =>{
        var data = [];
        if(result.data != null){ // 5-2
            var tmp = result.data.data
            Object.keys(tmp).map((key,index) => (
                data.push(new Keyword(tmp[key]['keyword'],
                tmp[key]['registrator'],tmp[key]['registration_date'],
                tmp[key]['recent_used_date'],tmp[key]['suggest_amount'],
                ).getDic())
            ))
            return data
        }
        return []
    });
}


export async function requestCreateKeyword(_keyword, _to_use_date){
    return await axios.post('/api/keyword/manage/', 
    {
        keyword: _keyword,
        to_use_date: _to_use_date
    },{withCredentials: true}
    ).catch(error => {return error.response}).then(result=>{
        return result
    })

}