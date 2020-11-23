import axios from 'axios'
import Member from '../models/Member'

export default async function requestReadAllMembers() {
    return await axios.get(
        '/api/member/manage/', { withCredentials: true }
    ).catch(error => { return [] }).then(result => {
        var data = [];
        if (result.data != null) {
            var tmp = result.data
            Object.keys(tmp).map((key, index) => (
                data.push((new Member(tmp[key]['id'], tmp[key]['name']
                    , tmp[key]['nickname'], tmp[key]['age'], tmp[key]['gender']
                    , tmp[key]['authority'], tmp[key]['phonenumber'], tmp[key]['email']
                )).get_dic())
            ))
            return data
        }
        return []
    });
}

export async function requestSearchMember(_code, _query) {
    return await axios.get(
        `/api/member/manage/`, { params: { code: _code, query: _query } },
        { withCredentials: true }
    ).catch(error => { console.warn(error); return [] }).then(result => {
        var data = [];
        if (result.data != null) {
            var tmp = result.data
            Object.keys(tmp).map((key, index) => (
                data.push((new Member(tmp[key]['id'], tmp[key]['name']
                    , tmp[key]['nickname'], tmp[key]['age'], tmp[key]['gender']
                    , tmp[key]['authority'], tmp[key]['phonenumber'], tmp[key]['email']
                )).get_dic())
            ))
            return data
        }
        return []
    });
}

export async function requestDeleteMember(member) {
    return await axios({ method: 'DELETE', url: '/api/member/manage/', data: { member: member }, withCredentials: true }).catch(err => { console.log(err); return err.response }).then(res => { return res })
}

export async function requestEditMember(_member) {
    return await axios.put('/api/member/manage/', { member: _member }, { withCredentials: true }).catch(err => { console.warn(err); return err.response }).then(res => { return res })
}

export async function requestLogin(id, pw) {
    return await axios.post(
        '/api/member/admin/login/',
        { id: id, pw: pw })
        .then(res => { return res }).catch(err => { console.log(err); return err.response });
}

export async function requestChangePw(_id) {
    return await axios.post('/api/member/password/', { id: _id }).then(res => { return res }).catch(err => { console.log(err); return err.response });
}