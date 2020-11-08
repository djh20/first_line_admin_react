import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NoticeAddDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        추가
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">알림 등록</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="receiver_id"
            label="수신 ID"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="sender_id"
            label="발신 ID"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="내용"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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