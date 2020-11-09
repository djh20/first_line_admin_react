import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import ReportStore from '../../stores/ReportStore'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import ReportProcessDialog from './ReportProcessDialog'
import ReportDetailDialog from './ReportDetailDialog'
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
}))


function createOptions(){
  return [
    { name : "신고 번호",type : "number"},
    { name : "신고 내용",type : "text"},
    { name : "처리 결과",type : "text"},
    { name : "처리 내용",type : "text"},
    { name : "신고일(이상)",type : "datetime-local"},
    { name : "신고일(이하)",type : "datetime-local"},
    { name : "처리일(이상)",type : "datetime-local"},
    { name : "처리일(이하)",type : "datetime-local"},
    { name : "신고자",type : "text"},
    { name : "처리자",type : "text"},
    { name : "처리 여부",type : "text"},
    { name : "대상 게시글 ID",type : "text"},
    { name : "대상 댓글 ID",type : "text"}
  ]
}

const columns = [
  { field: 'id', type : 'number',headerName: '신고 번호', width: getWidth(0.95,3/44), align:'left', headerAlign:'left' },
  { field: 'report_writer', type : 'string',headerName: '신고자', width: getWidth(0.95,3/44), align:'left', headerAlign:'left' },
  { field: 'report_text', type : 'string',headerName: '신고 내용', width: getWidth(0.95,5/44), align:'left', headerAlign:'left' },
  { field: 'process_writer', type : 'string',headerName: '처리자', width: getWidth(0.95,3/44), align:'left', headerAlign:'left' },
  { field: 'process_type', type : 'string',headerName: '처리 결과', width: getWidth(0.95,3/44), align:'left', headerAlign:'left' },
  { field: 'process_text', type : 'string',headerName: '처리 내용', width: getWidth(0.95,5/44), align:'left', headerAlign:'left' },
  { field: 'report_date', type : 'datetime',headerName: '신고일', width: getWidth(0.95,4/44), align:'left', headerAlign:'left' },
  { field: 'process_date', type : 'datetime',headerName: '처리일', width: getWidth(0.95,4/44), align:'left', headerAlign:'left' },
  { field: 'is_processed', type : 'string',headerName: '처리 여부', width: getWidth(0.95,3/44), align:'left', headerAlign:'left' },
  { field: 'reply', type : 'string',headerName: '댓글 ID', width: getWidth(0.95,3/44), align:'left', headerAlign:'left' },
  { field: 'post', type : 'string',headerName: '게시글 ID', width: getWidth(0.95,3/44), align:'left', headerAlign:'left' },
  {
    field: 'detail',
    headerName: '상세',
    renderCell: (params) => (
      <ReportDetailDialog report_id = {params.value['report_id']} report_text={params.value['report_text']} process_text={params.value['process_text']}/>
    ),
  },
  {
    field: 'process',
    headerName: '처리',
    renderCell: (params) => (
        params.value['is_processed'] == "미처리" ? 
        (<ReportProcessDialog report_id = {params.value['report_id']} report_text={params.value['report_text']}/>)
        : "처리됨"
    ),
  },
];


const ReportManageView = observer( (props) => {
  const [selected, setSelection] = React.useState([]);
  const reportStore = React.useContext(ReportStore.context)
  const classes = useStyles();
  const category = React.useRef();
  const input = React.useRef();
  const options = createOptions()
  const searchButtonClick = () => {
    reportStore.readReports(options[category.current.value]['name'] , input.current.value)
  }    

  React.useEffect(() => {
    reportStore.readReports("신고 내용","");
  }, []); 
  return (
    <div className={classes.root}>
          <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick}/>
          <div className={classes.table}>
            <DataGrid rows={reportStore.reports} columns={columns} pageSize={10}
            />
          </div>
    </div>
  );
})

export default ReportManageView