import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ReportAddDialog(props) {
  const [open, setOpen] = React.useState(false);
  const report_id = props.report_id
  const report_text = props.report_text
  const process_text = props.process_text
  const handleClickOpen = () => {
    setOpen(true);
    console.log(report_id)
    console.log(report_text)
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        조회
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">상세 조회</DialogTitle>
        <DialogContent>
         <TextField
            autoFocus
            margin="dense"
            id="text"
            defaultValue={report_id}
            label="신고 번호"
            type="text"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            id="text"
            defaultValue={report_text}
            label="신고 내용"
            type="text"
            multiline
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            id="text"
            defaultValue={process_text}
            label="처리 내용"
            type="text"
            multiline
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}