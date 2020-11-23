import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NativeSelect from '@material-ui/core/NativeSelect';
import { fade, makeStyles } from '@material-ui/core/styles';
import ReportStore from '../../stores/ReportStore'
import Alert from '@material-ui/lab/Alert';
import SnackbarStore from '../../stores/SnackbarStore'

const useStyles = makeStyles( (theme) => ({
  select:{
    marginTop:"5%",
  },
}))


export default function ReportAddDialog(props) {
  const [open, setOpen] = React.useState(false);
  const report_id = props.report_id
  const report_text = props.report_text
  const process_text = React.useRef()
  const process_type = React.useRef()
  const classes = useStyles()
  const reportStore = React.useContext(ReportStore.context)

  const handleClickOpen = () => {
    setOpen(true);
    console.log(report_id)
    console.log(report_text)
  };
  const handleClose = () => {
      reportStore.processReport(report_id,process_type.current.value, process_text.current.value).then(result =>{
         if(result.status == 200) {
          reportStore.readReports("신고 내용","");
            SnackbarStore.pushMessage(result['data']['message'], true)
         }
         else
            SnackbarStore.pushMessage(result['data']['message'], false)
      })
      setOpen(false)
  };




  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        처리
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">상세 조회</DialogTitle>
        <DialogContent>
         <TextField
            autoFocus
            margin="dense"
            id="report_id"
            defaultValue={report_id}
            label="신고 번호"
            type="text"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="report_text"
            defaultValue={report_text}
            label="신고 내용"
            type="text"
            multiline
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <NativeSelect
            className={classes.select}
            defaultValue={"내용"}
            inputRef={process_type}
            >
              <option value={"블라인드"}>{"블라인드"}</option>
              <option value={"삭제"}>{"삭제"}</option>
              <option value={"기각"}>{"기각"}</option>
          </NativeSelect>
          <TextField
            id="process_text"
            label="처리 내용"
            type="text"
            inputRef={process_text}
            multiline
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