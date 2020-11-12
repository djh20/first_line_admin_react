import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
export default function PostDetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const id = props.id
    const pw = props.pw    
    const name = props.name
    const nickname = props.nickname
    const age = props.age
    const gender = props.gender
    const authority = props.authority
    const phonenumber = props.phonenumber
    const email = props.email

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
                id="text"
                defaultValue={id}
                label="아이디"
                type="text"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="text"
                defaultValue={pw}
                label="비밀번호"
                type="text"
                fullWidth
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={name}
                label="이름"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={nickname}
                label="필명"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={age}
                label="나이"
                type="number"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={gender}
                label="성별"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={authority}
                label="권한"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={phonenumber}
                label="휴대전화번호"
                type="phonenumber"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={email}
                label="이메일"
                type="number"
                multiline
                fullWidth
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