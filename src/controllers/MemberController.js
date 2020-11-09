import axios from 'axios'
import Post from '../models/Post'

export default async function requestLogin(id, pw){
    return await axios.post(
      '/api/member/admin/login/', 
      {id : id ,pw : pw})
      .then(
        function (response) {
          console.log(response.status)
          if(response.status == 410)
            return false;
          else{

            return true
          }
    }).catch(error => {console.log('error : ',error.response)});
  }
