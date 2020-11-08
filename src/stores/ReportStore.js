import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadReports, {requestCreateReport, requestProcessReport} from '../controllers/ReportController'

class ReportStore {
    @observable reports = []
    static instance = null;

    static getInstance() {
        if (!ReportStore.instance) 
            this.instance = new ReportStore();
        return ReportStore.instance;

    }
    constructor() {
        this.context = createContext(this);
    }


    @action
    createReport(receiver_id, sender_id, text){
        return requestCreateReport(receiver_id, sender_id, text).then( result => {
            return result;
        })
    }

    @action
    readReports(condition, query)
    {
        return requestReadReports(condition, query).then( (reports) =>{
            this.reports = [...reports]
        })
    }

    @action
    processReport(process_text)
    {
        return requestReadReport(report_id).then( (report) =>{
            return report
        })
    }
}

export default ReportStore = ReportStore.getInstance();