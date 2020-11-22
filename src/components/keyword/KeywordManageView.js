import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import KeywordStore from '../../stores/KeywordStore'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import KeywordAddDialog from './KeywordAddDialog'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
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
    { name : "키워드",type : "text"},
    { name : "등록자",type : "text"},
    { name : "최초 등록일(이후)",type : "datetime-local"},
    { name : "최초 등록일(이전)",type : "datetime-local"},
    { name : "최근 사용일 (이후)",type : "date"},
    { name : "최근 사용일 (이전)",type : "date"},
    { name : "사용 예정일 (이후)",type : "date"},
    { name : "사용 예정일 (이전)",type : "date"},
    { name : "사용 수(이상)",type : "number"},
    { name : "사용 수(이하)",type : "number"},
  ]
}

const columns = [
  { field: 'id', type : 'number',headerName: '키워드', width: getWidth(0.95,1/6), align:'left', headerAlign:'left' },
  { field: 'registrator', type : 'string',headerName: '등록자', width: getWidth(0.95,1/6) , align:'left', headerAlign:'left'},
  { field: 'registration_date', type : 'datetime',headerName: '최초 등록일', width: getWidth(0.95,1/6) , align:'left', headerAlign:'left'},
  { field: 'recent_used_date', type : 'datetime',headerName: '최근 사용일' , width: getWidth(0.95,1/6), align:'left', headerAlign:'left'},
  { field: 'suggest_date', type : 'datetime',headerName: '사용 예정일' , width: getWidth(0.95,1/6), align:'left', headerAlign:'left'},
  { field: 'suggest_amount', type : 'datetime',headerName: '사용 수' , width: getWidth(0.95,1/6), align:'left', headerAlign:'left'},
];


const KeywordManageView = observer( (props) => {
  const [selected, setSelection] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [barOpen, setBarOpen] = React.useState(false)
  const [code, setCode] = React.useState(0);
  const keywordStore = React.useContext(KeywordStore.context)
  const classes = useStyles();
  const category = React.useRef();
  const input = React.useRef();
  const options = createOptions()
  const searchButtonClick = () => {
    keywordStore.readKeywords(options[category.current.value]['name'] , input.current.value)
  }    
  const deleteClick = () => {
    console.log(selected)
    keywordStore.deleteKeywords(selected).then(result => {
      console.info(result)
      if(result['status'] == 200){
        keywordStore.readKeywords("키워드","")
        setCode(1)
      }else
        setCode(2)
      setBarOpen(true)
      
      setMessage(result['data']['message'])
    })
  };

  React.useEffect(() => {
    keywordStore.readKeywords("키워드","");
  }, []); 
  return (
    <div className={classes.root}>
          <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick}/>
          <div className={classes.table}>
            <DataGrid rows={keywordStore.keywords} columns={columns} pageSize={10} checkboxSelection
            onSelectionChange={(data) => {
              setSelection(data)
              }}
            />
          </div>
          <div className={classes.buttons}>
            <KeywordAddDialog/>
            <Button variant="contained" color="secondary" onClick={deleteClick} >삭제</Button>
          </div>
          <Snackbar open={barOpen} autoHideDuration={6000} onClose={() => {setBarOpen(false)}}>
            {
            code == 1 ?(
            <Alert onClose={() => {setBarOpen(false)}} severity="success">
              {message}
            </Alert>):(
              <Alert onClose={() => {setBarOpen(false)}} severity="error">
              {message}
            </Alert>
            )
          }
        </Snackbar>
    </div>
  );
})

export default KeywordManageView