import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeywordStore from '../../stores/KeywordStore'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default function KeywordAddDialog() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState(0);
  const [barOpen, setBarOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const keywordStore = React.useContext(KeywordStore.context)
  const keyword = React.useRef()
  const to_use_date = React.useRef()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log(keyword)
    console.log(to_use_date)
    keywordStore.createKeyword(keyword.current.value, to_use_date.current.value).then(result => {
      console.log(result)
      if(result['status'] == 200){
        keywordStore.readKeywords("키워드","")
        setCode(1)
      }else
        setCode(2)
      setBarOpen(true)
      setMessage(result['data']['message'])
    })
    setOpen(false)
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        추가
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">키워드 등록</DialogTitle>
        <DialogContent>
          <DialogContentText>
             이미 등록된 키워드는 30일 이내
             사용하지 않았다면 재등록 가능
          </DialogContentText>
          <DialogContentText>
             영문 및 특수기호는 입력 불가능
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="receiver_id"
            inputRef={keyword}
            label="키워드"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="text"
            inputRef={to_use_date}
            label="사용 예정일"
            type="date"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}} color="primary">
            취소
          </Button>
          <Button onClick={handleClose} color="primary">
            등록
          </Button>
        </DialogActions>
      </Dialog>
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
}