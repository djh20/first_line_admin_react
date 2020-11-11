import React, {useEffect, useContext, useRef, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {observer} from 'mobx-react'
import PostStore from '../../stores/PostStore'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import PostDetailDialog from './PostDetailDialog'
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
        { name : "제목",type : "number"},
        { name : "게시글 번호 (이상)",type : "number"},
        { name : "게시글 번호 (이하)",type : "number"},
        { name : "조회수",type : "text"},
        { name : "좋아요 (이상)",type : "text"},
        { name : "좋아요 (이하)",type : "text"},
        { name : "댓글 수 (이상)",type : "text"},
        { name : "댓글 수 (이하)",type : "text"},
        { name : "태그",type : "text"},
        { name : "작성자",type : "text"},
        { name : "작성일 (이후)",type : "datetime-local"},
        { name : "작성일 (이전)",type : "datetime-local"},
        { name : "수정일 (이후)",type : "datetime-local"},
        { name : "수정일 (이전)",type : "datetime-local"},
        { name : "온도 (이상)",type : "text"},
        { name : "온도 (이하)",type : "text"},
        { name : "키워드",type : "text"},
        { name : "P/DP (이상)",type : "text"},
        { name : "P/DP (이하)",type : "text"},
        { name : "A/DA (이상)",type : "text"},
        { name : "A/DA (이상)",type : "text"},
        { name : "욕설 확률 (이상)",type : "number"},
        { name : "욕설 확률 (이하)",type : "number"},
        { name : "삭제 여부",type : "text"},
        { name : "블라인드 여부",type : "text"},
        { name : "내용",type : "text"},
    ]
}

//테이블
const columns = [
    { field: 'id', type : 'number', headerName: '글 번호', width: getWidth(0.95,2/34), align:'left', headerAlign:'left' },
    { field: 'title', type : 'string', headerName: '제목', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'num_lookup', type : 'number', headerName: '조회수', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'like',type : 'number', headerName: '좋아요' , width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'num_reply',type : 'number', headerName: '댓글수', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    { field: 'tag',type : 'string', headerName: '태그', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'writer',type : 'string', headerName: '작성자', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'writing_date',type : 'datetime', headerName: '작성 시간', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    { field: 'editing_date',type : 'datetime', headerName: '수정 시간', width :getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'temperature',type : 'number', headerName: '온도', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    { field: 'keyword',type : 'string', headerName: '키워드', width :getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    { field: 'prob_p_dp',type : 'number', headerName: '긍정/부정', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    { field: 'prob_a_da',type : 'number', headerName: '격렬/차분', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'prob_is_slang',type : 'number', headerName: '욕설 확률', width: getWidth(0.95,2/34), align:'left', headerAlign:'left'},
    { field: 'is_deleted',type : 'string', headerName: '삭제', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    { field: 'is_blinded',type : 'string', headerName: '블라인드', width: getWidth(0.95,2/34) , align:'left', headerAlign:'left'},
    {
        field: 'detail',
        headerName : '상세',
        renderCell:(params) => (
            <PostDetailDialog 
            post_id = {params.value['post_id']} 
            title = {params.value['title']} 
            text = {params.value['text']} 
            tag = {params.value['tag']} 
            writer = {params.value['writer']} 
            temperature = {params.value['temperature']} 
            keyword = {params.value['keyword']} ></PostDetailDialog>
        ),
    }  
];

const PostManageView = observer( (props) =>{
    const classes = useStyles();
    const [selected,setSelection] = useState([]);
    const [open,setOpen] = useState(false);
    const [code, setCode] = React.useState(0);
    const [type, setType] = useState('삭제');
    const category = useRef();
    const input = useRef();
    const options = createOptions()
    const postStore = useContext(PostStore.context)
    useEffect(() => {
            postStore.readAll();
        }, []); 
    const searchButtonClick = () => {
        postStore.searchPost(options[category.current.value]['name'] , input.current.value)
    }    
  
const deleteButtonClick = () => {
    postStore.deletePost(selected).then(result => {
        setType('삭제');
    if(result == true)
    {
        setCode(0);
        setOpen(true);
        postStore.readAll();
    }
    else
        setCode(1);
        setOpen(true);
  }
  )
}
        

const blindButtonClick = () => {
    postStore.blindPost(selected).then(result=> {
        setType('블라인드');
        if(result == true)
        {
            setCode(0);
            setOpen(true);
            postStore.readAll();
        }
        else
            setCode(0);
            setOpen(true);
            postStore.readAll();
    } 
        )
}
    return (
      <div className={classes.root}>
      <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick} />
      <div className={classes.table}>
        <DataGrid rows={postStore.posts} columns={columns} pageSize={10} checkboxSelection
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
          <Button  variant="contained" color="third" onClick={blindButtonClick}>블라인드</Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => {setOpen(false)}}>
        {
        code == 1 ?(
        <Alert onClose={() => {setOpen(false)}} severity="error">
          {type} 실패하였습니다.
        </Alert>):(
          <Alert onClose={() => {setOpen(false)}} severity="success">
          {type} 성공하였습니다.
        </Alert>
        )
        }
      </Snackbar>
</div>
    );
}
)

export default PostManageView