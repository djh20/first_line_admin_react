import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackbarStore from '../../stores/SnackbarStore'
import Alert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';
import MemberStore from '../../stores/MemberStore'
export default function ChangePwDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [barOpen, setBarOpen] = React.useState(false);
    const id = useRef()
    const memberStore = React.useContext(MemberStore.context)
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        memberStore.changePw(id.current.value).then(result =>{
            if(result['status'] == 200)
            {
                SnackbarStore.pushMessage(result['data']['message'], true)
            }
            else
                SnackbarStore.pushMessage(result['data']['message'], false)
        })
        setOpen(false)
    };

    return (
        <div>
      <Typography variant="contained" color="primary" onClick={handleClickOpen}>
        비밀번호 변경
      </Typography>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">비밀번호 변경</DialogTitle>
        <DialogContent>
            <Typography>
                비밀번호 변경을 원하는 아이디를 입력해주세요. 
            </Typography>
            <Typography>
                회원님의 이메일로 새로운 비밀번호가 전송됩니다.
            </Typography>
            <TextField
                autoFocus
                margin="dense"
                id="id"
                label="아이디"
                type="text"
                fullWidth
                inputRef={id}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                새 비밀번호 받기
            </Button> 
            <Button onClick={() => {setOpen(false) }} color="primary">
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}