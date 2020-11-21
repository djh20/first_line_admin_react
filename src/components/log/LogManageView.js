import React, {useEffect, useContext, useRef, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import LogStore from '../../stores/LogStore'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import { DataGrid } from '@material-ui/data-grid';
import LogDetailDialog from './LogDetailDialog'

var elem = (document.compatMode === "CSS1Compat") ? 
    document.documentElement :
    document.body;

var height = elem.clientHeight;
var width = elem.clientWidth;


function getWidth(tableRate,rate){
    return width*tableRate*rate
}

const useStyles = makeStyles( (theme) => ({
    root:{
        width:"100%",
        height:"100vh",
    },
    inputRoot: {
        width: "50%",
        marginRight:"1%",
        marginBottom:"2%",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    table: {
        width: '100%',
        height: '70%',
        background: 'white',
    },
    colHeader:{
        width : "6%",
        textAlign:'center'
    },
    cell:{
        width : "6%",
        textAlign:'center'
    },
    select: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        marginRight : '0.5%'
    },
    search: {
        textAlign: 'center',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft : 'auto',
        marginRight : 'auto',
      },
    buttons: {
        marginTop : '2%',
        float : 'right',
    }
}))

// 검색 필드
function createOptions() {
    return [
        { name : "전체", type : "text"},
        { name : "로그 번호 (이상)",type : "text"},
        { name : "로그 번호 (이하)",type : "text"},
        { name : "요청자 ip",type : "text"},
        { name : "요청자 id",type : "text"},
        { name : "요청 종류",type : "text",},
        { name : "요청 경로",type : "text"},
        { name : "요청 시간", type : "local_datatime"},
        { name : "수신 코드",type : "number"},
        { name : "수신 코드 내용",type : "text"},
    ]
}

//테이블
const columns = [
    { field: 'id', type : 'number', headerName: '로그 번호', width: getWidth(0.95,2/24), align:'left', headerAlign:'left' },
    { field: 'requester_ip', type : 'string', headerName: '요청자 ip', width: getWidth(0.95,2/22), align:'left', headerAlign:'left'},
    { field: 'requester_id', type : 'string', headerName: '요청자 id', width: getWidth(0.95,2/22), align:'left', headerAlign:'left'},
    { field: 'request_method',type : 'string', headerName: '요청 종류' , width: getWidth(0.95,2/22), align:'left', headerAlign:'left'},
    { field: 'url',type : 'string', headerName: '요청 경로', width: getWidth(0.95,3/22), align:'left', headerAlign:'left'},
    { field: 'logging_date', type : 'datetime', headerName: '요청 시간', width: getWidth(0.95,2/22), align:'left', headerAlign:'left'},
    { field: 'result_code',type : 'number', headerName: '수신 코드' , width: getWidth(0.95,2/22), align:'left', headerAlign:'left'},
    { field: 'result_code_detail',type : 'string', headerName: '수신 코드 내용', width: getWidth(0.95,3/22), align:'left', headerAlign:'left'},
    {
        field: 'detail',
        headerName : '상세',
        renderCell:(params) => (
            <LogDetailDialog 
                id = {params.value['id']} 
                requester_ip = {params.value['requester_ip']} 
                requester_id = {params.value['requester_id']} 
                request_method = {params.value['request_method']} 
                url = {params.value['url']} 
                logging_date = {params.value['logging_date']} 
                result_code = {params.value['result_code']} 
                result_code_detail = {params.value['result_code_detail']} 
            >  
            </LogDetailDialog>
        ),
    }  
];

const LoginLogManageView = observer( (props) =>{
    const classes = useStyles();
    const [selected,setSelection] = useState([]);
    const category = useRef();
    const input = useRef();
    const options = createOptions()
    const logStore = useContext(LogStore.context)
    useEffect(() => {
        logStore.readLog();
        }, []); 
        
    const searchButtonClick = () => {
        logStore.searchLog(options[category.current.value]['name'] , input.current.value)
    }    
        
    return (
        <div className={classes.root}>
        <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick} />
        <div className={classes.table}>
            <DataGrid rows={logStore.logs} columns={columns} pageSize={10} checkboxSelection
            onSelectionChange={(data) => {
                setSelection(data)
            }}
            />
        </div>
</div>
    );
}
)

export default LoginLogManageView