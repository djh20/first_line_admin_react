import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginLogStore from '../../stores/LoginLogStore'

export default function LoginLogDetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const defult_id = props.id
    const requester_ip = props.requester_ip
    const login_id = props.login_id
    const logging_date = props.logging_date
    const login_result = props.login_result
    const handleClickOpen = () => {
        setOpen(true);
    }
    return (
        <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        조회
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">회원 상세 보기</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="id"
                defaultValue={defult_id}
                label="로그 번호"
                type="text"
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                id="name"
                defaultValue={requester_ip}
                label="요청자 ip"
                type="text"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                defaultValue={login_id}
                label="아이디"
                type="text"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                id="age"
                defaultValue={logging_date}
                label="로그인 날짜"
                type="number"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                id="gender"
                defaultValue={login_result}
                label="로그인 결과"
                type="text"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {setOpen(false) }} color="primary">
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}