import React, {useEffect, useContext, useRef, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import LoginLogStore from '../../stores/LoginLogStore'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import LoginLogDetailDialog from './LoginLogDetailDialog'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
        { name : "요청자 ip",type : "text"},
        { name : "아이디",type : "text"},
        { name : "로그인 날짜 (이후)",type : "datetime-local"},
        { name : "로그인 날짜 (이전)",type : "datetime-local"},
        { name : "로그인 결과",type : "text"},
    ]
}

//테이블
const columns = [
    { field: 'id', type : 'string', headerName: '로그 번호', width: getWidth(0.95,2/24), align:'left', headerAlign:'left' },
    { field: 'requester_ip', type : 'string', headerName: '요청자 ip', width: getWidth(0.95,2/16), align:'left', headerAlign:'left'},
    { field: 'login_id', type : 'string', headerName: '아이디', width: getWidth(0.95,2/16), align:'left', headerAlign:'left'},
    { field: 'logging_date',type : 'datetime', headerName: '로그인 날짜' , width: getWidth(0.95,2/12), align:'left', headerAlign:'left'},
    { field: 'login_result',type : 'number', headerName: '로그인 결과', width: getWidth(0.95,3/16), align:'left', headerAlign:'left'},
    {
        field: 'detail',
        headerName : '상세',
        renderCell:(params) => (
            <LoginLogDetailDialog 
                id = {params.value['id']} 
                requester_ip = {params.value['requester_ip']} 
                login_id = {params.value['login_id']} 
                nickname = {params.value['nickname']} 
                logging_date = {params.value['logging_date']} 
                login_result = {params.value['login_result']} 
            >  
            </LoginLogDetailDialog>
        ),
    }  
];

const LoginLogManageView = observer( (props) =>{
    const classes = useStyles();
    const [selected,setSelection] = useState([]);
    const [open,setOpen] = useState(false);
    const [code, setCode] = React.useState(0);
    const category = useRef();
    const input = useRef();
    const options = createOptions()
    const loginLogStore = useContext(LoginLogStore.context)

    useEffect(() => {
        loginLogStore.readLoginLog();
        }, []); 
        
    const searchButtonClick = () => {
        loginLogStore.searchLoginLog(options[category.current.value]['name'] , input.current.value)
    }    
        
    return (
        <div className={classes.root}>
        <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick} />
        <div className={classes.table}>
            <DataGrid rows={loginLogStore.loginLogs} columns={columns} pageSize={10} checkboxSelection
            onSelectionChange={(data) => {
            for(var i = 0 ; i < data['rows'].length ;  i++){
                console.log(toJS(data['rows'][i]))
            }
            setSelection(data)
            }}
            />
        </div>
</div>
    );
}
)

export default LoginLogManageView