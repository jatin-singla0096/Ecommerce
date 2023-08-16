import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  let host="http://127.0.0.1:300/auth/createUser";
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",Cpassword:""});
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }
  const handleSubmit=async (e)=>{
   e.preventDefault();
   const response = await fetch(host, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
  });
  let json=await response.json();
  if(json.success && credentials.password===credentials.Cpassword){
    localStorage.setItem("auth-token",json.token);
    navigate("/");
  }
  else{
    alert("Invalid credentials")
  }
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
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={handleChange} aria-describedby="emailHelp"/>
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

export default Signup
