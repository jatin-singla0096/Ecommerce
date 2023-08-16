import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateData = () => {
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({name:"",password:"",Cpassword:""});
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:300/auth/updateUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({name:credentials.name,password:credentials.password,Cpassword:credentials.Cpassword}),
    });
    let item4 = await response.json();
    if(item4.name===credentials.name){
     navigate("/about");
    }
    else{
      alert("Data not updated due to which wrong password")
    }
    }
    const handleChange=(e)=>{
     setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3'>
      <h2>Create a new account</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="name" name="name" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={handleChange} id="password" name="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={handleChange} id="Cpassword" name="Cpassword"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default UpdateData
