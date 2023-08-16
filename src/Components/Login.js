import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate=useNavigate();
  const host="http://127.0.0.1:300/auth/login";
  const [credentials, setCredentials] = useState({email:"",password:""});
  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(host, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({email:credentials.email,password:credentials.password})
   });
   let json =await response.json();
   if(!json.success){
    alert("Invalid Credentials");
   }
   else{
    localStorage.setItem('auth-token',json.token);
    navigate("/");
   }
  }
  return (
    <div className='container my-3'>
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handleChange} name="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
