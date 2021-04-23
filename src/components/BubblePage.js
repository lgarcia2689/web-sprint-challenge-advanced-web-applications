import React, { useEffect, useState } from "react";
import axios from "axios";
import {axiosWithAuth} from '../helpers/axiosWithAuth'
import {useParams} from 'react-router-dom';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
    .get("/api/colors")
    .then((res)=>{
      console.log(res)
      setColorList(res.data)
    })
    .catch((err)=>{
      console.log({err})
    })
  }, [])


  return (
    <div className="container">
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
