import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginLogStore from '../../stores/LoginLogStore'

export default function LogDetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const defult_id = props.id
    const requester_ip = props.requester_ip
    const requester_id = props.requester_id
    const request_method = props.request_method
    const url = props.url
    const logging_date = props.logging_date
    const result_code = props.result_code
    const result_code_detail = props.result_code_detail
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
                defaultValue={requester_id}
                label="요청자 id"
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
                defaultValue={request_method}
                label="요청 종류"
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
                defaultValue={url}
                label="요청 경로"
                type="text"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                id="gender"
                defaultValue={logging_date}
                label="요청 시간"
                type="text"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                id="gender"
                defaultValue={result_code}
                label="수신 코드"
                type="text"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                id="gender"
                defaultValue={result_code_detail}
                label="수신 코드 내용"
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