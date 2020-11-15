import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import KeywordStore from '../../stores/KeywordStore'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'
import SeachSpace from '../common/SearchSpace'
import KeywordAddDialog from './KeywordAddDialog'
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
    { name : "최초 등록일(이상)",type : "datetime-local"},
    { name : "최초 등록일(이하)",type : "datetime-local"},
    { name : "최근 사용(예정)일 (이상)",type : "date"},
    { name : "최근 사용(예정)일 (이하)",type : "date"},
    { name : "사용 수(이상)",type : "number"},
    { name : "사용 수(이하)",type : "number"},
  ]
}

const columns = [
  { field: 'id', type : 'number',headerName: '키워드', width: getWidth(0.95,1/5), align:'left', headerAlign:'left' },
  { field: 'registrator', type : 'string',headerName: '등록자', width: getWidth(0.95,1/5) , align:'left', headerAlign:'left'},
  { field: 'registration_date', type : 'datetime',headerName: '최초 등록일', width: getWidth(0.95,1/5) , align:'left', headerAlign:'left'},
  { field: 'recent_used_date', type : 'datetime',headerName: '최근 사용일' , width: getWidth(0.95,1/5), align:'left', headerAlign:'left'},
  { field: 'suggest_amount', type : 'datetime',headerName: '사용 수' , width: getWidth(0.95,1/5), align:'left', headerAlign:'left'},
];


const KeywordManageView = observer( (props) => {
  const [selected, setSelection] = React.useState([]);
  const keywordStore = React.useContext(KeywordStore.context)
  const classes = useStyles();
  const category = React.useRef();
  const input = React.useRef();
  const options = createOptions()
  const searchButtonClick = () => {
    keywordStore.readKeywords(options[category.current.value]['name'] , input.current.value)
  }    

  React.useEffect(() => {
    keywordStore.readKeywords("키워드","");
  }, []); 
  return (
    <div className={classes.root}>
          <SeachSpace category={category} input={input} options={options} onSearch={searchButtonClick}/>
          <div className={classes.table}>
            <DataGrid rows={keywordStore.keywords} columns={columns} pageSize={10}
            />
          </div>
          <div className={classes.buttons}>
          <KeywordAddDialog/>
          </div>
    </div>
  );
})

export default KeywordManageView