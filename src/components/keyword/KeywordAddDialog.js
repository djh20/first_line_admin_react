import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import KeywordStore from '../../stores/KeywordStore'
import SnackbarStore from '../../stores/SnackbarStore'

export default function KeywordAddDialog() {
  const [open, setOpen] = React.useState(false);
  const keywordStore = React.useContext(KeywordStore.context)
  const keyword = React.useRef()
  const to_use_date = React.useRef()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    keywordStore.createKeyword(keyword.current.value, to_use_date.current.value).then(result => {
      console.log(result)
      if(result['status'] == 200){
        keywordStore.readKeywords("키워드","")
        SnackbarStore.pushMessage(result['data']['message'], true)
      }else
      SnackbarStore.pushMessage(result['data']['message'], false)
    })
    setOpen(false)
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen} style={{marginRight:"2%"}}>
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
    </div>
  );
}