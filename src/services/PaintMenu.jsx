import React, { useState } from 'react';
import { IconButton, Drawer, List, ListItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

export default function PaintMenu (props) {
  const [open, setOpen] = useState(false)

  const drawer = (
    <div style={{width: "10rem"}}>
      <List>
        <ListItem button>
        </ListItem >
        <ListItem button>
        </ListItem>
      </List>
    </div>
  )

  return (
    <div style={{display: 'flex'}}>
    </div>
  )
};