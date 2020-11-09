export default class Reply{
    constructor(id,post_id,text,writer,writing_date,editing_date,is_deleted,is_blinded,prob_is_slang){
        this.id = id
        this.post_id = post_id
        this.text = text
        this.writer = writer
        this.writing_date = writing_date
        this.editing_date = editing_date
        this.is_deleted = is_deleted
        this.is_blinded = is_blinded
        this.prob_is_slang = prob_is_slang
    }

    get_dic()
    {
        return {
            id : this.id,
            post_id : this.post_id,
            text : this.text,
            writer : this.writer,
            writing_date : this.writing_date,
            editing_date : this.editing_date,
            is_deleted : this.is_deleted,
            is_blinded : this.is_blinded,
            prob_is_slang : this.prob_is_slang
        }
    }
}