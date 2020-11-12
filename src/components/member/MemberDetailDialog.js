import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MemberStore from '../../stores/MemberStore'

export default function PostDetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const defult_id = props.id
    const defult_pw = props.pw    
    const defult_name = props.name
    const defult_nickname = props.nickname
    const defult_age = props.age
    const defult_gender = props.gender
    const defult_authority = props.authority
    const defult_phonenumber = props.phonenumber
    const defult_email = props.email
    const id = useRef()
    const pw = useRef()    
    const name = useRef()
    const nickname = useRef()
    const age = useRef()
    const gender = useRef()
    const authority = useRef()
    const phonenumber = useRef()
    const email = useRef()
    const memberStore = React.useContext(MemberStore.context)
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        memberStore.createMember(id.current.value, pw.current.value,name.current.value,nickname.current.value,age.current.value,
        gender.current.value,authority.current.value,phonenumber.current.value,email.current.value).then(result => {
            if(result['status'] == 200){
                setCodess(1)
            }
            else
                setCode(2)
            setOpen(true)
        })
        setOpen(false)
    };

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
                inputRef={id}
                defaultValue={defult_id}
                label="아이디"
                type="text"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="pw"
                inputRef={pw}
                defaultValue={defult_pw}
                label="비밀번호"
                type="text"
                fullWidth
            />
            <TextField
                margin="dense"
                id="name"
                inputRef={name}
                defaultValue={defult_name}
                label="이름"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="nickname"
                inputRef={nickname}
                defaultValue={defult_nickname}
                label="필명"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="age"
                inputRef={age}
                defaultValue={defult_age}
                label="나이"
                type="number"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="gender"
                inputRef={gender}
                defaultValue={defult_gender}
                label="성별"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="authority"
                inputRef={authority}
                defaultValue={defult_authority}
                label="권한"
                type="text"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="phonenumber"
                inputRef={phonenumber}
                defaultValue={defult_phonenumber}
                label="휴대전화번호"
                type="phonenumber"
                multiline
                fullWidth
            />
            <TextField
                margin="dense"
                id="email"
                inputRef={email}
                defaultValue={defult_email}
                label="이메일"
                type="number"
                multiline
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                수정
            </Button> 
            <Button onClick={() => {setOpen(false)}} color="primary">
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}