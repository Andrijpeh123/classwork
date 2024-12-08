import { Link } from "react-router-dom";
import useLocalStorage from "../effects/useLocalStorage"
import axios from "axios";
import { useEffect,useState } from "react";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Main = () => {
  const [token,setToken]= useLocalStorage('token', '');
  const[dogs,setDogs]=useState([] as any[]);

  const logout=()=>{
    setToken('');
  }

  const getDogs=()=>{
    if(!token){
      return
    } 
    axios.get(`https://dogs.kobernyk.com/api/v1/dogs`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(response =>{
      setDogs(response.data);
      console.log(response.data)
    });
  }

  useEffect(getDogs, []);


  if (token){
    return <>
      Ви авторизовані <br />
      <button onClick={logout}>Вийти</button>
      {dogs.map(dog => {
         return <Card sx={{ maxWidth: 345 }}>
         <CardMedia
           sx={{ height: 140 }}
           image={dog.image}
           title="green iguana"
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
             {dog.name}
           </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             Колір: {dog.color}<br />
             Порода: {dog.breed}
           </Typography>
         </CardContent>
         <CardActions>
           <Button size="small">Деталі</Button>
          
         </CardActions>
       </Card>
     
    })}
    </>
  }else{
    return <>
    <Link to="/login">Авторизуватися</Link>
    </>
  }
}

export default Main;
