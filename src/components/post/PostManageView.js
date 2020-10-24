import React, {useEffect, useContext, useState} from 'react'
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

import PostStore from '../../stores/PostStore'

const useStyles = makeStyles( (theme) => ({
    root:{
        width:"100% "
    }
    ,
    table: {
      maxWidth: '100%',
      overflowX: 'auto'
    },
    colHeader:{
        width : "6%",
        textAlign:'center'
    },
    paper:{
        maxWidth: '95%',
    },
    cell:{
        width : "6%",
        textAlign:'center'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
  }));
const PostManageView = observer( (props) =>{
    const classes = useStyles();
    const [t,setT] = useState(0)
    const colHeaders = ["게시글 번호", "제목", "좋아요", "댓글 수", 
    "태그", "작성자", "작성일", "수정일", "온도", "키워드"
    , "P/DP", "A/DA", "욕설 확률", "삭제 여부", "블라인드 여부" ];
    const postStore = useContext(PostStore.context)
    useEffect(() => {
        postStore.readAll();
      }, []); 
      
    return (
        <div className={classes.root}> 
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        <Button  variant="contained" color="primary" >검색</Button>
        <Button  variant="contained" color="secondary" >삭제</Button>
        <Button  variant="contained" color="third" >블라인드</Button>
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