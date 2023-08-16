import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate=useNavigate();
  const [user, setUser] = useState([]);
  const handleClick=(e)=>{
    e.preventDefault();
    navigate("/confirmPassword")
  }
  const data=async ()=>{
    const response = await fetch("http://127.0.0.1:300/auth/userData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    let item3 = await response.json();
    setUser(item3);
  }
  useEffect( () => {
    let token=localStorage.getItem("auth-token");
    if(!token){
      navigate("/login");
    }
    else{
    data();}
  }, []);
  return (
    <div style={{marginTop:"70px",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} className="container">
    <h3 style={{marginBottom:"70px"}}>User Data</h3>
    <div style={{margin:"5px"}}>Name-  {user.name}</div>
    <div style={{margin:"5px"}}>Email- {user.email}</div>
    <button style={{width:"300px",margin:"5px"}} onClick={handleClick}>Update Id</button>
    </div>
  )
}

export default About
