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

import ReplyStore from '../../stores/ReplyStore'
import { autorun } from 'mobx';


const useStyles = makeStyles( (theme) => ({
    root:{
        width:"70% ",
        marginLeft : 'auto',
        marginRight : 'auto'
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
        marginLeft : 'auto',
        marginRight : 'auto'
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
}))


const ReplyManageView = observer( (props) =>{
    const classes = useStyles();
    const [reply,setReply] = useState(0);

    const colHeaders = ["댓글번호", "게시글 번호", "내용", "작성자", "작성일", "수정일", 
    "욕설 확률", "삭제 여부", "블라인드 여부" ];
    const replyStore = useContext(ReplyStore.context);
    
    useEffect(() => {
        replyStore.readAllReplies();
      }, []); 

    return( 
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
        <div className={classes.content}>      
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
                        replyStore.replies.map((reply,index) =>{
                            return (
                                <TableRow key={reply.post_id}>
                                <TableCell className={classes.cell}>{reply.reply_id}</TableCell>    
                                <TableCell className={classes.cell}>{reply.post_id}</TableCell>
                                <TableCell className={classes.cell}>{reply.text}</TableCell>
                                <TableCell className={classes.cell}>{reply.writer}</TableCell>
                                <TableCell className={classes.cell}>{reply.writing_date}</TableCell>
                                <TableCell className={classes.cell}>{reply.editing_date}</TableCell>
                                <TableCell className={classes.cell}>{reply.prob_is_slang}</TableCell>
                                <TableCell className={classes.cell}>{reply.is_deleted}</TableCell>
                                <TableCell className={classes.cell}>{reply.is_blinded}</TableCell>
                            </TableRow>
                            )
                        })
                    }
                    </TableBody> 
                </Table>
            </TableContainer>
        </div>
    </div>
    )
})

export default (ReplyManageView)