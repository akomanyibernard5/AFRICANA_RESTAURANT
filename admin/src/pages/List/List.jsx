import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from "react-toastify"

const List = ({url}) => {
  const [list, setList] = useState([]);


  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data)
    }
    else {
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Error")
    }
  }


  useEffect(() => {
    fetchList();
  }, []);


  return (
    <div className='list-container'>
      <p className='header'>All Foods</p>
      <div className="list-table">
        <div className="list-table-header">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-row">
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <button onClick={() => removeFood(item._id)}>X</button>
            </div>
          ))
        ) : (
          <div className="list-empty">No food items found</div>
        )}
      </div>
    </div>
  )
}

export default List
