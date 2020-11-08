import React, {useEffect, useContext, useState, useRef} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import Button from '@material-ui/core/Button';
import ReplyStore from '../../stores/ReplyStore'
import { DataGrid } from '@material-ui/data-grid';
import SeachSpace from '../common/SearchSpace'

const useStyles = makeStyles( (theme) => ({
    root:{
        width:"90%",
        height:"100vh",
        marginRight: 'auto',
        marginLeft : 'auto'
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
        width: '90%',
        height: '70%',
        background: 'white',
        marginRight: 'auto',
        marginLeft : 'auto'
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
    { field: 'reply_id', type : 'number',headerName: '댓글 번호', width: getWidth(0.95,1/9), align:'left', headerAlign:'left' },
    { field: 'post_id', type : 'number',headerName: '게시글 번호', width: getWidth(0.95,1/9) , align:'left', headerAlign:'left'},
    { field: 'text', type : 'string',headerName: '내용' , width: getWidth(1.5,1/9), align:'left', headerAlign:'left'},
    { field: 'writer', type : 'string',headerName: '작성자' , width: getWidth(0.95,1/9), align:'left', headerAlign:'left'},
    { field: 'writing_date',type : 'dateTime', headerName: '작성일' , width: getWidth(0.95,1/9), align:'left', headerAlign:'left'},
    { field: 'editing_date',type : 'dateTime', headerName: '수정일', width: getWidth(0.95,1/9) , align:'left', headerAlign:'left'},
    { field: 'is_deleted',type : 'number', headerName: '욕설 확률', width: getWidth(0.95,1/9) , align:'left', headerAlign:'left'},
    { field: 'is_blinded',type : 'string', headerName: '삭제 여부', width: getWidth(0.95,1/9) , align:'left', headerAlign:'left'},
    { field: 'prob_is_slang',type : 'string', headerName: '블라인드 여부', width: getWidth(0.95,1/9) , align:'left', headerAlign:'left'},
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

var elem = (document.compatMode === "CSS1Compat") ? 
    document.documentElement :
    document.body;

var width = elem.clientWidth;


function getWidth(tableRate,rate){
  return width*tableRate*rate
}

    
const ReplyManageView = observer( (props) =>{
    const classes = useStyles();
    const category = useRef();
    const input = useRef();
    const [reply,setReply] = React.useState([]);
    const replyStore = useContext(ReplyStore.context);
    const options = createOptions()

    React.useEffect(() => {
        replyStore.readAllReplies();
      }, []); 
    
    const searchButtonClick = () => {
        replyStore.search(category.current.value, input.current.value, 1)
    }

    return( 
    <div className={classes.root}> 
        <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick}/>          
        <div className={classes.table}>     
            <DataGrid rows={replyStore.replies} columns={columns} pageSize={10}
                checkboxSelection
                onSelectionChange={(data) => {
                for(var i = 0 ; i < data['rows'].length ; i++){
                    console.log(toJS(data['rows'][i]))
                }
                setReply(data)
                }}
            /> 
        </div>
        <div className={classes.buttons}>
                    <Button  variant="contained" color="secondary" >삭제</Button>
                    <Button  variant="contained" color="third" >블라인드</Button>
            </div>
    </div>
    )
})

export default (ReplyManageView)