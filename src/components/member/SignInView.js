import React, {useContext, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MemberStore from '../../stores/MemberStore'
import {observer} from "mobx-react"
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '92vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInView = observer( (props) => {
    const classes = useStyles();
    const id = useRef("")
    const pw = useRef("")
    const setHasCookie = props.setHasCookie
    const memberStore = useContext(MemberStore.context)
    function login(e){
      e.preventDefault()
      if(id.current.value != "" && pw.current.value != ""){
            memberStore.login(id.current.value,pw.current.value).then(result =>{
              if(result == true){
                alert("로그인 되었습니다")
                setHasCookie(true)
              }
              else{
                alert("로그인에 실패했습니다")
              }
          }
        )
      }else{
        alert("아이디와 비밀번호를 입력해주세요")
      }
    }



    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="아이디"
                name="id"
                autoComplete="email"
                autoFocus
                inputRef={id}
                required
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                inputRef={pw}
                autoComplete="current-password"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={login}
                required
              >
                {"로그인"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {"비밀번호를 잃어버리셨나요?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"계정이 없으신가요?"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>

      </Grid>
    );
  }
)
export default SignInView