import { observable, action } from "mobx";
import { createContext } from "react";
import requestReadReports, {requestProcessReport} from '../controllers/ReportController'

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
    readReports(condition, query)
    {
        return requestReadReports(condition, query).then( (reports) =>{
            this.reports = [...reports]
        })
    }

    @action
    processReport(report_id, process_type, process_text)
    {
        return requestProcessReport(report_id, process_type,process_text).then( (result) =>{
            return result
        })
    }
}

export default ReportStore = ReportStore.getInstance();