import React, {useEffect, useContext, useState, useRef} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import Button from '@material-ui/core/Button';
import ReplyStore from '../../stores/ReplyStore'
import { DataGrid } from '@material-ui/data-grid';
import SeachSpace from '../common/SearchSpace'
import {toJS} from 'mobx'
import ReplyDetailDialog from './ReplyDetailDialog'
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



const columns = 
[
    { field: 'id', type : 'number',headerName: '댓글 번호', align:'left',width: getWidth(0.95,2/20), headerAlign:'left',resizable: true },
    { field: 'post_id', type : 'number',headerName: '게시글 번호',  align:'left',width: getWidth(0.95,2/20), headerAlign:'left',resizable: true},
    { field: 'text', type : 'string',headerName: '내용' ,  align:'left', width: getWidth(0.95,2/20),headerAlign:'left' ,resizable: true},
    { field: 'writer', type : 'string',headerName: '작성자' , align:'left',width:getWidth(0.95,2/20), headerAlign:'left' ,resizable: true},
    { field: 'writing_date',type : 'dateTime', headerName: '작성일' , align:'left',width: getWidth(0.95,2/20), headerAlign:'left' ,resizable: true},
    { field: 'editing_date',type : 'dateTime', headerName: '수정일',align:'left',width: getWidth(0.95,2/20), headerAlign:'left' ,resizable: true},
    { field: 'is_deleted',type : 'number', headerName: '욕설 확률',  align:'left',width: getWidth(0.95,2/20), headerAlign:'left' ,resizable: true},
    { field: 'is_blinded',type : 'string', headerName: '삭제 여부',  align:'left',width:getWidth(0.95,2/20), headerAlign:'left',resizable: true},
    { field: 'prob_is_slang',type : 'string', headerName: '블라인드 여부',align:'left',width: getWidth(0.95,2/20), headerAlign:'left',resizable: true},
    { 
        field: 'detail',
        headerName : '상세',
        renderCell:(params) => (
            <ReplyDetailDialog
                reply_id = {params.value['reply_id']}
                text = {params.value['text']}
                writer = {params.value['writer']}
            ></ReplyDetailDialog>
        )
    }    
];

function createOptions() {
    return [
        { name : "댓글 번호 (이상)",type : "number"},
        { name : "댓글 번호 (이하)",type : "number"},
        { name : "게시글 번호 (이상)",type : "number"},
        { name : "게시글 번호 (이하)",type : "number"},
        { name : "내용",type : "text"},
        { name : "작성자",type : "text"},
        { name : "작성일 (이후)",type : "datetime-local"},
        { name : "작성일 (이전)",type : "datetime-local"},
        { name : "수정일 (이후)",type : "datetime-local"},
        { name : "수정일 (이전)",type : "datetime-local"},
        { name : "욕설 확률 (이상)",type : "number"},
        { name : "욕설 확률 (이하)",type : "number"},
        { name : "삭제 여부",type : "text"},
        { name : "블라인드 여부",type : "text"},
    ]
}
    
const ReplyManageView = observer( (props) =>{
    const classes = useStyles();
    const [selected,setSelection] = useState([]);
    const [open,setOpen] = useState(false);
    const [code, setCode] = React.useState(0);
    const [type, setType] = useState('삭제');
    const [message, setMessage] = React.useState("");
    const category = useRef();
    const input = useRef();
    const options = createOptions()
    const replyStore = useContext(ReplyStore.context);

    React.useEffect(() => {
        replyStore.readAllReplies();
      }, []); 
    
    const searchButtonClick = () => {
        replyStore.search(options[category.current.value]['name'] , input.current.value)
    }

    const deleteButtonClick = () => {
        replyStore.deleteReply(selected).then(result => {
        if(result['status'] == 200)
        {
            setCode(0);
            replyStore.readAllReplies();
        }
        else
            setCode(1);
        setOpen(true);
        setMessage(result['data']['message'])
      }
      )
    }
    
    const blindButtonClick = () => {
        replyStore.blindReply(selected).then(result=> {
            if(result['status'] == 200)
            {
                setCode(0);
                replyStore.readAllReplies();
            }
            else
                setCode(1);
            setOpen(true);
            setMessage(result['data']['message'])
        } 
            )
    }
    
    return( 
    <div className={classes.root}> 
        <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick}/>          
        <div className={classes.table}>     
            <DataGrid rows={replyStore.replies} columns={columns} pageSize={10} checkboxSelection   CanUserSortColumns="True"
                onSelectionChange={(data) => {
                    for(var i = 0 ; i < data['rows'].length ; i++){
                    console.log(toJS(data['rows'][i]))
                    }
                    setSelection(data)
                }}
            /> 
        </div>
        <div className={classes.buttons}>
            <Button  variant="contained" color="secondary" onClick={deleteButtonClick} >삭제</Button>
            <Button  variant="contained" color="third" onClick={blindButtonClick}>블라인드</Button>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={() => {setOpen(false)}}>
            {
                code == 1 ?(
                <Alert onClose={() => {setOpen(false)}} severity="error">
                    {message}
                </Alert>):(
                <Alert onClose={() => {setOpen(false)}} severity="success">
                    {message}
                </Alert>
                )
            }
      </Snackbar>
    </div>
    )
})

export default (ReplyManageView)