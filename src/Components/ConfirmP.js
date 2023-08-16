import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const ConfirmP = () => {
  const navigate=useNavigate();
    const [credentials, setCredentials] = useState({password:""});
    const handleSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:300/auth/confirmPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({password:credentials.password}),
    });
    let item4 = await response.json();
    if(item4.success){
     navigate("/updateUser");
    }
    else{
      alert("Password didnot Match")
    }
    
    }
const handleChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}


  return (
    <div className='container my-3'>
      <h2>Confirm Password</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handleChange} name="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default ConfirmP
