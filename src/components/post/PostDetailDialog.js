import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser';
import Typography from '@material-ui/core/Typography';
export default function PostDetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const post_id = props.post_id
    const title = props.title
    const text = parse(props.text)
    const tag = props.tag
    const writer = props.writer
    const temperature = props.temperature
    const handleClickOpen = () => {
        setOpen(true);
    }
    console.log(post_id)
    console.log(text)
    return (
        <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        조회
      </Button>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">게시글 상세 보기</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="text"
                defaultValue={post_id}
                label="게시글 번호"
                type="number"
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                autoFocus
                margin="dense"
                id="text"
                defaultValue={temperature}
                label="온도"
                type="number"
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <TextField
                margin="dense"
                id="text"
                defaultValue={title}
                label="제목"
                type="text"
                multiline
                fullWidth
                InputProps={{
                readOnly: true,
                }}
            />
            <Typography variant="h7" >
                {text}
            </Typography>
            <TextField
                margin="dense"
                id="text"
                defaultValue={tag}
                label="태그"
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
                defaultValue={writer}
                label="작성자"
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