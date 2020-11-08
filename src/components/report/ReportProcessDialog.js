import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NoticeStore from '../../stores/NoticeStore'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default function NoticeAddDialog() {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState(0);
  const [barOpen, setBarOpen] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const noticeStore = React.useContext(NoticeStore.context)
  const receiver_id = React.useRef()
  const sender_id = React.useRef()
  const text = React.useRef()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    noticeStore.createNotice(receiver_id.current.value, sender_id.current.value, text.current.value).then(result => {
      console.log(result)
      if(result['status'] == 200){
        noticeStore.readNotices("내용","")
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
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        처리
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">알림 등록</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="receiver_id"
            inputRef={receiver_id}
            label="수신 ID"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="sender_id"
            inputRef={sender_id}
            label="발신 ID"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="text"
            inputRef={text}
            label="내용"
            type="text"
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