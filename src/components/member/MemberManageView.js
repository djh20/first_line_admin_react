import React, {useEffect, useContext, useRef, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import MemberStore from '../../stores/MemberStore'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import MemberDetailDialog from './MemberDetailDialog'
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
        { name : "아이디",type : "text"},
        { name : "비밀번호",type : "text"},
        { name : "필명",type : "text"},
        { name : "나이 (이상)",type : "number"},
        { name : "나이 (이하)",type : "number"},
        { name : "성별",type : "text"},
        { name : "권한",type : "number"},
        { name : "휴대폰 번호",type : "text"},
        { name : "이메일",type : "text"},
    ]
}

//테이블
const columns = [
    { field: 'id', type : 'string', headerName: '아이디', width: getWidth(0.95,2/34), align:'left', headerAlign:'left' },
    { field: 'pw', type : 'string', headerName: '비밀번호', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'name', type : 'string', headerName: '이름', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'nickname', type : 'string', headerName: '필명', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'age',type : 'number', headerName: '나이' , width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'gender',type : 'number', headerName: '성별', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    { field: 'authority',type : 'string', headerName: '권한', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'phonenumber',type : 'string', headerName: '휴대폰 번호', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'email',type : 'string', headerName: '이메일', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    {
        field: 'detail',
        headerName : '상세',
        renderCell:(params) => (
            <MemberDetailDialog 
                id = {params.value['id']} 
                pw = {params.value['pw']} 
                name = {params.value['name']} 
                nickname = {params.value['nickname']} 
                age = {params.value['age']} 
                gender = {params.value['gender']} 
                authority = {params.value['authority']} 
                phonenumber = {params.value['phonenumber']}
                email = {params.value['email']}
            >  
            </MemberDetailDialog>
        ),
    }  
];

const MemberManageView = observer( (props) =>{
    const classes = useStyles();
    const [selected,setSelection] = useState([]);
    const [open,setOpen] = useState(false);
    const [code, setCode] = React.useState(0);
    const category = useRef();
    const input = useRef();
    const options = createOptions()
    const memberStore = useContext(MemberStore.context)
    useEffect(() => {
        memberStore.readAllMembers();
        }, []); 
    const searchButtonClick = () => {
        memberStore.searchMember(options[category.current.value]['name'] , input.current.value)
    }    
  
    const deleteButtonClick = () => {
        memberStore.deleteMember(selected).then(result => {
        if(result == true)
        {
            setCode(0);
            setOpen(true);
            memberStore.readAllMembers();
        }
        else
        {
            setCode(1);
            setOpen(true);
        }
        }
    )
    }
        
    return (
        <div className={classes.root}>
        <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick} />
        <div className={classes.table}>
            <DataGrid rows={memberStore.members} columns={columns} pageSize={10} checkboxSelection
            onSelectionChange={(data) => {
            for(var i = 0 ; i < data['rows'].length ;  i++){
                console.log(toJS(data['rows'][i]))
            }
            setSelection(data)
            }}
        />
        </div>
        <div className={classes.buttons}>
            <Button  variant="contained" color="secondary" onClick={deleteButtonClick} >삭제</Button>
            </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => {setOpen(false)}}>
            {
            code == 1 ?(
            <Alert onClose={() => {setOpen(false)}} severity="error">
            삭제 실패하였습니다.
            </Alert>):(
            <Alert onClose={() => {setOpen(false)}} severity="success">
            삭제 성공하였습니다.
            </Alert>
            )
            }
        </Snackbar>
</div>
    );
}
)

export default MemberManageView