import React, {useEffect, useContext, useState, useRef} from 'react'
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
import ReplyStore from '../../stores/ReplyStore'
import NativeSelect from '@material-ui/core/NativeSelect';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles( (theme) => ({
    root:{
        width:"70% ",
        marginLeft : 'auto',
        marginRight : 'auto'
    },
    inputRoot: {
        width: "50%",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight :'1%'
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
        marginRight : '1%'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft : 'auto',
        marginRight : 'auto',
        alignItems: 'center',
        marginBottom : '10%',
      },
    buttons: {
        marginBottom : '2%',
        float : 'right',
    },
    grid : {
        width : '100%',
        
    }
    
}))


const ReplyManageView = observer( (props) =>{
    const classes = useStyles();
    const category = useRef();
    const input = useRef();
    const [reply,setReply] = useState(0);
    var dic = ["작성일 (이후)", "작성일 (이전)" ,"수정일 (이후)" , "수정일 (이전)"];
    const colHeaders = 
    [
        "댓글 번호", "게시글 번호", "내용", "작성자", "작성일", "수정일", "욕설 확률", "삭제 여부", "블라인드 여부"
        ,<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} /> 
    ];

    const replyStore = useContext(ReplyStore.context);
    
    useEffect(() => {
        replyStore.readAllReplies();
      }, []); 
    
    const searchButtonClick = () => {
        replyStore.search(category.current.value, input.current.value, 1)
    }

    const checkDic = () => {
        var i;
        for (i=0;i<dic.length;i++)
        {
            if(category.current.value == dic[i])
            {
                return true;
            }
        }
        return false;
    }
    
    const selectCategory = () => {
        var inputField = document.getElementById("input");
        input.current.value = null;
        var isNeedTime = checkDic();
        if(isNeedTime)
        {
            inputField.type = "date";
            var today = new Date().toISOString;
            inputField.defaultValue = today;
        }
        else 
        {
            inputField.type = "none";
        }
    }

    return( 
        <div className={classes.root}> 
        <div className={classes.search} >
            <Grid container  direction="row" justify="center" alignItems="center" className={classes.grid}>
                <NativeSelect
                    className={classes.select}
                    defaultValue={"내용"}
                    inputRef={category}
                    onChange={selectCategory}
                    >
                    <option value={'댓글 번호 (이상)'}>댓글 번호 (이상)</option>
                    <option value={'댓글 번호 (이하)'}>댓글 번호 (이하)</option>
                    <option value={"게시글 번호 (이상)"}>게시글 번호 (이상)</option>
                    <option value={"게시글 번호 (이하)"}>게시글 번호 (이하)</option>
                    <option value={"내용"}>내용</option>
                    <option value={"작성자"}>작성자</option>
                    <option value={"작성일 (이후)"}>작성일 (이후)</option>
                    <option value={"작성일 (이전)"}>작성일 (이전)</option>
                    <option value={"수정일 (이후)"}>수정일 (이후)</option>
                    <option value={"수정일 (이전)"}>수정일 (이전)</option>
                    <option value={"욕설 확률 (이상)"}>욕설 확률 (이상)</option>
                    <option value={"욕설 확률 (이하)"}>욕설 확률 (이하)</option>
                    <option value={"삭제 여부"}>삭제 여부</option>
                    <option value={"블라인드 여부"}>블라인드 여부</option>
                </NativeSelect>

                <InputBase
                placeholder="Search"
                id="input"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputRef={input}
                onKeyUp={event => event.key === "Enter" ? searchButtonClick() : null}
                inputProps={{ 'aria-label': 'search' }}
                />
                <Button  variant="contained" color="primary" onClick={searchButtonClick} >검색</Button>
            </Grid>         
        </div>
        <div className={classes.content}>      
            
            
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
            <div className={classes.buttons}>
                    <Button  variant="contained" color="secondary" >삭제</Button>
                    <Button  variant="contained" color="third" >블라인드</Button>
            </div>
        </div>
    </div>
    )
})

export default (ReplyManageView)