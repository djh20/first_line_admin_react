export default class Post{
    constructor(post_id,title,text,like,num_reply,tag,writer,writing_date,editing_date,temperature,keyword, prop_p_dp, prob_a_da,prob_is_slang,is_deleted,is_blinded){
        this.post_id = post_id
        this.title = title
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
}

