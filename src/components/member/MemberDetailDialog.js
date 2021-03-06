import React, {useState, useEffect, useContext, useRef} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MemberStore from '../../stores/MemberStore'
import SnackbarStore from '../../stores/SnackbarStore'
import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles( (theme) => ({
    
    select : {
        width : "100%"
    },
    label : {
        marginTop : "1.5%",
        fontSize : '0.8rem'
    }
}))

export default function PostDetailDialog(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [select, setSelect] = React.useState(false);
    const defult_id = props.id
    const defult_name = props.name
    const defult_nickname = props.nickname
    const defult_age = props.age
    const defult_gender = props.gender
    const defult_authority = props.authority
    const defult_phonenumber = props.phonenumber
    const defult_email = props.email
    const id = useRef()
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
        memberStore.createMember(id.current.value,name.current.value,nickname.current.value,age.current.value,
            gender.current.value,authority.current.value,phonenumber.current.value,email.current.value).then(result => {
            if(result['status'] == 200)
            {
                SnackbarStore.pushMessage(result['data']['message'], true)
            }
            else
                SnackbarStore.pushMessage(result['data']['message'], false)
        })
        setOpen(false)
        memberStore.readAllMembers()
    };

    const selectClose = () => {
        setSelect(false);
    };

    const selectOpen = () => {
        setSelect(true);
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
                InputProps={{
                readOnly: true,
                }}
                disabled
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
            <InputLabel className={classes.label}>
            성별
            </InputLabel>
            {
                defult_gender == '남성' ?(
                <Select
                    className={classes.select}
                    defaultValue={true}
                    onClose={selectClose}
                    onOpen={selectOpen}
                    inputRef={gender}
                >
                    <MenuItem value={true}>남성</MenuItem>
                    <MenuItem value={false}>여성</MenuItem>
                </Select>):(
                <Select      
                    className={classes.select}
                    defaultValue={false}
                    onClose={selectClose}
                    onOpen={selectOpen}
                    inputRef={gender}
                >
                    <MenuItem value={false}>여성</MenuItem>
                    <MenuItem value={true}>남성</MenuItem>
                </Select>
                )
            }
            <br/>
            <InputLabel className={classes.label}>
            권한
            </InputLabel>
            {
                defult_authority == '회원' ?(
                <Select   
                    className={classes.select}
                    defaultValue={'회원'}
                    onClose={selectClose}
                    onOpen={selectOpen}
                    inputRef={authority}
                >
                    <MenuItem value={'회원'}>회원</MenuItem>
                    <MenuItem value={'관리자'}>관리자</MenuItem>
                </Select>):(
                <Select       
                    className={classes.select}
                    defaultValue={'관리자'}
                    onClose={selectClose}
                    onOpen={selectOpen}
                    inputRef={authority}
                >
                    <MenuItem value={'회원'}>회원</MenuItem>
                    <MenuItem value={'관리자'}>관리자</MenuItem>
                </Select>
                )
            }
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
            <Button onClick={() => {setOpen(false) }} color="primary">
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}