import React,{useEffect,useContext} from 'react'
import Items from "./Items"
import StoreContext from '../Context/storeContext';

const Store = () => {
    const context = useContext(StoreContext);
  const {getAllStoreItems,storeItemsSearch} = context;
    useEffect(() => {
        getAllStoreItems();
        // eslint-disable-next-line
    }, []);
  return (
    <div className='container' style={{margin:"80px"}}>
      <div className='row'>
      {storeItemsSearch.map((element)=>{
      return <div className='col-md-3' style={{margin:"10px 10px"}} key={element.id}>
        <Items cartItemS={element}/>
      </div>
      })}
    </div>
    </div>
  )
}

export default Store
