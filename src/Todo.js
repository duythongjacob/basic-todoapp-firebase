import React from 'react'
import {List, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
function Todo(props) {
  
  return (
    <List>
        <ListItem className="todo__list">
            <ListItemAvatar>

            </ListItemAvatar>
            <ListItemText primary= {props.text} secondary="Dummy deadLin  ⏰ "  />
        </ListItem>
        
    </List>

 
  )
}

export default Todo
