export default class Member{
    constructor(id , name , nickname ,age , gender , authority ,phonenumber , email ){
        this.id = id
        this.name = name
        this.nickname = nickname
        this.age = age
        this.gender = gender
        this.authority = authority
        this.phonenumber = phonenumber
        this.email = email
    }
    get_dic()
    {
        return {
            id : this.id,
            name : this.name,
            nickname : this.nickname,
            age : this.age,
            gender : this.gender,
            authority : this.authority,
            phonenumber : this.phonenumber,
            email : this.email,
            detail : {'id' : this.id,'name' : this.name, 'nickname' : this.nickname,'age' : this.age, 'gender' : this.gender, 
            'authority' : this.authority, 'phonenumber' : this.phonenumber, 'email' : this.email}
        }
    }

}