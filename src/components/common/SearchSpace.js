import * as React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import NativeSelect from '@material-ui/core/NativeSelect';
const useStyles = makeStyles( (theme) => ({
    root:{
      width:"100%",
      height:"100vh",
    },
    inputRoot: {
        width: "50%",
        marginRight:"1%",
        marginBottom:"2%",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    select: {
        backgroundColor: fade(theme.palette.common.white, 0.15),
        marginRight : '0.5%'
    },
    search: {
        textAlign: 'center',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft : 'auto',
        marginRight : 'auto',
      },
    buttons: {
        marginBottom : '2%',
        float : 'right',
    },
}))

    const checkDic = () => {
        var i;
        for (i=0;i<dic.length;i++)
        {
            if(category.current.value == dic[i])
            {
                return true;
            }
        }
        return false;
    }
 
export default function SearchSpace(props){
    const classes = useStyles();
    const category = props.category
    const input = props.input
    const options = props.options
    const onSearch = props.onSearch
    const selectCategory = () => {
        input.current.value = null
        input.current.type = options[category.current.value].type
    }
    return(
    <div className={classes.search}>
            <NativeSelect
                className={classes.select}
                defaultValue={"내용"}
                inputRef={category}
                onChange={selectCategory}
                >
                {   
                    options.map( (col,index) =>{
                        return(
                            <option value={index}>{col.name}</option>
                        )
                    }
                    )
                }
            </NativeSelect>
            <InputBase
                placeholder="Search"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputRef={input}
                onKeyUp={event => event.key === "Enter" ? onSearch() : null}
                inputProps={{ 'aria-label': 'search' }}
            />
            <Button  variant="contained" color="primary" onClick={onSearch}>검색</Button>   
    </div>
    )
}