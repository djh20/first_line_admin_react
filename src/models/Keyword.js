export default class Keyword{
    constructor(keyword, registrator, registration_date, recent_used_date, suggest_amount, suggest_date){
        this.keyword =keyword
        this.registrator =registrator
        this.registration_date =registration_date
        this.recent_used_date =recent_used_date
        this.suggest_amount =suggest_amount
        this.suggest_date =suggest_date
    }

    getDic(){
        return{
            id : this.keyword,
            registrator : this.registrator,
            registration_date : this.registration_date,
            recent_used_date : this.recent_used_date,
            suggest_amount : this.suggest_amount,
            suggest_date : this.suggest_date
        }
    }
}

