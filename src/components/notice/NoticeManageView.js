import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import NoticeStore from '../../stores/NoticeStore'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import NoticeAddDialog from './NoticeAddDialog'
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
    background: 'white'
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


function createOptions(){
  return [
    { name : "전체",type : "text"},
    { name : "알림 번호",type : "number"},
    { name : "수신 ID",type : "test"},
    { name : "발신 ID",type : "test"},
    { name : "발신 시각(이하)",type : "datetime-local"},
    { name : "발신 시각(이상)",type : "datetime-local"},
    { name : "내용",type : "text"},
    { name : "읽음",type : "select", option:{True:"Y", False:"N"}},
    { name : "url",type : "text"},
  ]
}

const columns = [
  { field: 'id', type : 'number',headerName: '알림번호', width: getWidth(0.95,1/7), align:'left', headerAlign:'left' },
  { field: 'receiver_id', type : 'string',headerName: '수신ID', width: getWidth(0.95,1/7) , align:'left', headerAlign:'left'},
  { field: 'sender_id', type : 'string',headerName: '발신ID' , width: getWidth(0.95,1/7), align:'left', headerAlign:'left'},
  { field: 'text', type : 'string',headerName: '내용' , width: getWidth(0.95,1/7), align:'left', headerAlign:'left'},
  { field: 'send_datetime',type : 'dateTime', headerName: '발신 시각' , width: getWidth(0.95,1/7), align:'left', headerAlign:'left'},
  { field: 'is_read',type : 'string', headerName: '읽음', width: getWidth(0.95,1/7) , align:'left', headerAlign:'left'},
  { field: 'source_url',type : 'string', headerName: '링크', width: getWidth(0.95,1/7) , align:'left', headerAlign:'left'},
];


const NoticeManageView = observer( (props) => {
  const [selected, setSelection] = React.useState([]);
  const noticeStore = React.useContext(NoticeStore.context)
  const classes = useStyles();
  const category = React.useRef();
  const input = React.useRef();
  const options = createOptions()
  const searchButtonClick = () => {
    noticeStore.readNotices(options[category.current.value]['name'] , input.current.value)
  }    

  React.useEffect(() => {
    noticeStore.readNotices("내용","");
  }, []); 
  return (
    <div className={classes.root}>
          <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick}/>
          <div className={classes.table}>
            <DataGrid rows={noticeStore.notices} columns={columns} pageSize={10}
            />
          </div>
          <div className={classes.buttons}>
          <NoticeAddDialog/>
          </div>
    </div>
  );
})

export default NoticeManageView