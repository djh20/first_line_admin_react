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
                tmp[key]['report_text'],tmp[key]['process_type'],tmp[key]['process_text'],
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

export async function requestProcessReport(_report_id, _process_type, _process_text){
    return await axios.post('/api/report/manage/process/', 
    {
        report_id: _report_id,
        process_type: _process_type,
        process_text: _process_text,
    },{withCredentials: true}
    ).catch(error => {return error.response}).then(result=>{
        return result
    })

}