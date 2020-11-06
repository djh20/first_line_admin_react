import React, {useEffect, useContext, useRef, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {observer} from 'mobx-react'
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import { autorun } from 'mobx';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect'; 

import PostStore from '../../stores/PostStore'

const useStyles = makeStyles( (theme) => ({
      root:{
        width:"70% ",
        marginLeft : 'auto',
        marginRight : 'auto'
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
        maxWidth: '100%',
        overflowX: 'auto'
      },
      colHeader:{
          width : "6%",
          textAlign:'center'
      },
      paper:{
          maxWidth: '100%',
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
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          marginLeft : 'auto',
          marginRight : 'auto',
        },
      buttons: {
          marginBottom : '2%',
          float : 'right',

      },
}))


const PostManageView = observer( (props) =>{
    const classes = useStyles();
    const [t,setT] = useState(0)
    const category = useRef();
    const input = useRef();
    const colHeaders = ["게시글 번호", "제목", "조회수", "좋아요", "댓글 수","태그", "작성자", "작성일", "수정일", "온도", "키워드", "P/DP", "A/DA", "욕설 확률", "삭제 여부", "블라인드 여부" 
    ,<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} /> ];
    const postStore = useContext(PostStore.context)
    useEffect(() => {
        postStore.readAll();
      }, []); 

    const searchButtonClick = () => {
        postStore.search(category.current.value, input.current.value, 1)
    }    

    const selectCategory = () => {
      var input = document.getElementById("input");
      if(category.current.value == "작성일 (이후)" || category.current.value ==  "작성일 (이전)" ||  category.current.value ==  "수정일 (이후)" ||  category.current.value ==  "수정일 (이전)")
      {
          input.type = "datetime-local";
      }
      else 
      {
          input.type = "none";
      }
  }

    return (
        <div className={classes.root}> 
        <div className={classes.search}>
            <NativeSelect
                className={classes.select}
                defaultValue={"내용"}
                inputRef={category}
                onChange={selectCategory}
                >
                <option value={"게시글 번호 (이상)"}>게시글 번호 (이상)</option>
                <option value={"게시글 번호 (이하)"}>게시글 번호 (이하)</option>
                <option value={"제목"}>제목</option>
                <option value={"조회수 (이상)"}>조회수 (이상)</option>
                <option value={"조회수 (이하)"}>조회수 (이상)</option>
                <option value={"좋아요 (이상)"}>좋아요 (이상)</option>
                <option value={"좋아요 (이하)"}>좋아요 (이하)</option>
                <option value={"댓글 수"}>댓글 수 (이상)</option>
                <option value={"태그"}>태그</option>
                <option value={"작성일 (이후)"}>작성일 (이후)</option>
                <option value={"작성일 (이전)"}>작성일 (이전)</option>
                <option value={"수정일 (이후)"}>수정일 (이후)</option>
                <option value={"수정일 (이전)"}>수정일 (이전)</option>
                <option value={"온도 (이상)"}>온도 (이상)</option>
                <option value={"온도 (이하)"}>온도 (이하)</option>
                <option value={"키워드"}>키워드</option>
                <option value={"P/DP (이상)"}>P/DP (이상)</option>
                <option value={"P/DP (이하)"}>P/DP (이하)</option>
                <option value={"A/DA (이상)"}>A/DA (이상)"</option>
                <option value={"A/DA (이하)"}>A/DA (이하)"</option>
                <option value={"욕설 확률 (이상)"}>욕설 확률 (이상)</option>
                <option value={"욕설 확률 (이하)"}>욕설 확률 (이하)</option>
                <option value={"삭제 여부"}>삭제 여부</option>
                <option value={"블라인드 여부"}>블라인드 여부</option>
            </NativeSelect>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputRef={input}
              onKeyUp={event => event.key === "Enter" ? searchButtonClick() : null}
              inputProps={{ 'aria-label': 'search' }}
            />
            <Button  variant="contained" color="primary" onClick={searchButtonClick}>검색</Button>   
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" color="secondary" >삭제</Button>
          <Button variant="contained" color="third" >블라인드</Button>
        </div>
      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
                {
                    colHeaders.map( (col,index) =>{
                        return(
                        <TableCell className={classes.colHeader}>
                            {col}</TableCell>
                        )
                    }
                    )   
                }
            </TableRow>
          </TableHead>
          <TableBody>
          {
              postStore.posts.map((post,index) =>{
                return (
                    <TableRow key={post.post_id}>
                    <TableCell className={classes.cell}>{post.post_id}</TableCell>
                    <TableCell className={classes.cell}>{post.title}</TableCell>
                    <TableCell className={classes.cell}>{post.num_lookup}</TableCell>
                    <TableCell className={classes.cell}>{post.like}</TableCell>
                    <TableCell className={classes.cell}>{post.num_reply}</TableCell>
                    <TableCell className={classes.cell}>{post.tag}</TableCell>
                    <TableCell className={classes.cell}>{post.writer}</TableCell>
                    <TableCell className={classes.cell}>{post.writing_date}</TableCell>
                    <TableCell className={classes.cell}>{post.editing_date}</TableCell>
                    <TableCell className={classes.cell}>{post.temperature}</TableCell>
                    <TableCell className={classes.cell}>{post.keyword}</TableCell>
                    <TableCell className={classes.cell}>{post.prob_p_dp}</TableCell>
                    <TableCell className={classes.cell}>{post.prob_a_da}</TableCell>
                    <TableCell className={classes.cell}>{post.prob_is_slang}</TableCell>
                    <TableCell className={classes.cell}>{post.is_deleted}</TableCell>
                    <TableCell className={classes.cell}>{post.is_blinded}</TableCell>
                    <TableCell className={classes.cell}>
                                <Checkbox
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                </TableCell>
                  </TableRow>
                )
              })
          }
        </TableBody> 
        </Table>
      </TableContainer>
      </div>
    );
}
)

export default PostManageView