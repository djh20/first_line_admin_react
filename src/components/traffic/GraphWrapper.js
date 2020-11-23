import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';

export default function GraphWrapper(props){
  const Graph = props.Graph
  const title = props.title
  const width = props.width
  const useStyle = makeStyles(theme=>({
    root : {    
        width: width,
        marginLeft:'5%',
        marginBottom:'3%'
    },
    graph:{
        padding:0,
        margin:0,
        boxShadow: '1% 1% 1% 1% #2a2a40'
    },
    title:{
        marginBottom:'2%',
        fontSize:'1.2rem',
        fontWeight: 'bold',
        
    }
}))
const classes = useStyle();

  return (
        <div className={classes.root}>
        <Typography className={classes.title}>{title}</Typography>
         <Box boxShadow={3}>
            <Graph/>
         </Box>
        
        </div>
  );
}

