export default class Post{
    constructor(id,title,num_lookup,text,like,num_reply,tag,writer,writing_date,editing_date,temperature,keyword, prop_p_dp, prob_a_da,prob_is_slang,is_deleted,is_blinded){
        this.id = id
        this.title = title
        this.num_lookup = num_lookup
        this.text = text
        this.like = like
        this.num_reply = num_reply
        this.tag = tag
        this.writer = writer
        this.writing_date = writing_date
        this.editing_date = editing_date
        this.temperature = temperature
        this.keyword = keyword
        this.prob_p_dp = prop_p_dp
        this.prob_a_da = prob_a_da
        this.prob_is_slang = prob_is_slang
        this.is_deleted = is_deleted
        this.is_blinded = is_blinded
    }
    
    get_dic(){
        return{
            id : this.id,
            title : this.title,
            num_lookup : this.num_lookup,
            text : this.text,
            like : this.like,
            num_reply : this.num_reply,
            tag : this.tag,
            writer : this.writer,
            writing_date : this.writing_date,
            editing_date : this.editing_date,
            temperature : this.temperature,
            keyword : this.keyword,
            prob_p_dp : this.prop_p_dp,
            prob_a_da : this.prob_a_da,
            prob_is_slang : this.prob_is_slang,
            is_deleted : this.is_deleted,
            is_blinded : this.is_blinded
        }
    }
}

