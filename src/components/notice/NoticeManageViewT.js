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
import TablePagination from '@material-ui/core/TablePagination'; 
import NoticeStore from '../../stores/NoticeStore'

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


const NoticeManageView = observer( (props) =>{
    const classes = useStyles();
    const category = useRef();
    const input = useRef();
    const colHeaders = ["알림번호", "수신ID", "발신ID", "내용", "발신 시각", "읽음"];
    const [selected, setSelected] = useState([])
    const [render, setRender] = useState(true)
    const noticeStore = useContext(NoticeStore.context)
    useEffect(() => {
        noticeStore.readNotices("내용","");
      }, []); 

    const searchButtonClick = () => {
        noticeStore.readNotices(category.current.value , input.current.value)
    }    

    const checkAll = (value) => {
        var checkboxes = document.getElementsByName("checkbox")
        for(var i = 0 ; i < checkboxes.length ; i++){
          checkboxes[i].setAttribute('checked',value)
        }
        setRender(!render)
    }

    const setCheckBox = (value, id) => {
      if(value == true){
        setSelected([...selected , id])
      }else{
        var tmp = []
        for(var i = 0 ; i < selected.length ; i++){
          if(selected[i] != id)
             tmp.push(selected[i])
        }
        setSelected([...tmp])
      }
      console.log("Dsadas")
    }

    return (
        <div className={classes.root}> 
        <div className={classes.search}>
            <NativeSelect
                className={classes.select}
                defaultValue={"내용"}
                inputRef={category}
                >
                {   
                    colHeaders.map( (col,index) =>{
                        return(
                            <option value={col}>{col}</option>
                        )
                    }
                    )
                }
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
                <TableCell className={classes.cell}>
                  <Checkbox
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onChange = {(e) => {checkAll(e.currentTarget.checked)}}
                  />
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              noticeStore.notices.map((notice,index) =>{
                return (
                    <TableRow key={notice.notice_id}>
                    <TableCell className={classes.cell}>{notice.notice_id}</TableCell>
                    <TableCell className={classes.cell}>{notice.receiver_id}</TableCell>
                    <TableCell className={classes.cell}>{notice.sender_id}</TableCell>
                    <TableCell className={classes.cell}>{notice.text}</TableCell>
                    <TableCell className={classes.cell}>{notice.send_datetime}</TableCell>
                    <TableCell className={classes.cell}>{notice.is_read}</TableCell>
                    <TableCell className={classes.cell}>
                      <Checkbox
                          color="primary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          onChange={e =>{setCheckBox(e.currentTarget.checked, notice.notice_id)}}
                          name="checkbox"
                      />
                    </TableCell>
                  </TableRow>
                )
              })
          }
        </TableBody> 
        </Table>
        { noticeStore.totalPage > 1 ? "" : (
        <TablePagination
        component="div"
        labelDisplayedRows= {(from, to ,count, page) => {return noticeStore.currentPage + " / " + noticeStore.totalPage}}
        rowsPerPageOptions={[]}
        labelRowsPerPage={""}
        // onChangePage={handleChangePage}
        // onChangeRowsPerPage={handleChangeRowsPerPage}
      />
        )
      
        }

     </TableContainer>
      </div>
    );
}
)

export default NoticeManageView