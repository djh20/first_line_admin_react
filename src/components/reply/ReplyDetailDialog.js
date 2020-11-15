import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
export default function ReplyDetailDialog(props) {
    const [open, setOpen] = React.useState(false);
    const reply_id = props.reply_id
    const text = props.text
    const writer = props.writer
    const handleClickOpen = () => {
        setOpen(true);
    }

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
                defaultValue={reply_id}
                label="댓글 번호"
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
                defaultValue={text}
                label="내용"
                type="text"
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