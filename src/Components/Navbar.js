import React,{useContext} from 'react'
import {Link,useLocation,useNavigate} from "react-router-dom";
import StoreContext from '../Context/storeContext';

const Navbar = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const context = useContext(StoreContext);
  const {setStoreItemsSearch,storeItems,setCartItemsSearch,cartItem1,searchBar, setSearchBar} = context;
  const handleClick=()=>{
    localStorage.removeItem("auth-token");
    navigate('/login');
  }
  const handleChange1=(e)=>{
    setSearchBar(e.target.value)
    if(location.pathname==='/'){
    if(e.target.value===""){
      setStoreItemsSearch(storeItems);
    }
    else{
      const newcart = storeItems.filter((item1) => {
        return item1.title.includes(e.target.value);
      });
      setStoreItemsSearch(newcart);
    }}
    else{
      if(e.target.value===""){
        setCartItemsSearch(cartItem1);
      }
      else{
        const newcart = cartItem1.filter((item1) => {
          return item1.title.includes(e.target.value);
        });
        setCartItemsSearch(newcart);
      }
    }
  }
  return (
    <div className='Fixed-Nav' style={{position:"fixed",top:"0",width:"100%",zIndex:1}}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Amax</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">My Cart</Link>
        </li>
      </ul>
      <form role="search">
        <input className="form-control me-2" type="search" placeholder="Search" onChange={handleChange1} style={{width:"300px"}} aria-label="Search"/>
      </form>
      {!localStorage.getItem("auth-token")?<form className="d-flex" role="search">
        <Link className="btn btn-primary mx-2" to="/signup" type="submit">Sign Up</Link>
        <Link className="btn btn-primary mx-1" to="/login" type="submit">Log In</Link>
      </form>:<button className="btn btn-primary mx-1" onClick={handleClick}>Log out</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
