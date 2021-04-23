import React, { useState } from "react";
import {useParams} from 'react-router-dom';
import Color from './Color'
import EditMenu from './EditMenu'
import {axiosWithAuth} from '../helpers/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  // const {id} = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${setColorToEdit.id}`,colorToEdit)
    .then((res)=>{
      updateColors(colors.map(color => {
        if(res.data.id === color.id){
          return res.data
        }
        return color
      }))
    })
    .catch((err)=>{
      console.log({err})
    })
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`api/colors/${color.id}`)
    .then((res)=>{
      updateColors(colors.filter(({id}) => {
        return color.id !== id
      }))
    })
    .catch((err)=>{
      console.log({err})
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }
    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.