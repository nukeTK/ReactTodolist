import React, { useEffect, useState } from "react";
import Items from "./Items";
import { nanoid } from "nanoid";
import './App.css'

const getLocalStorage = () => {
  let list = localStorage.getItem("listItems");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("listItems")));
  } else {
    return [];
  }
};

const App = () => {
  const [itemName, setItemName] = useState("");
  const [listItems, setListItems] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [alert, setAlert] = useState({show:false,msg:''})
  
  
  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems]);


  const handlechange = (e) => {
    e.preventDefault();
    if (!itemName) {
      console.log("error")
    } 
    else if (itemName && isEdit) 
    {
      setListItems(
        listItems.map(value=> {
        if (value.id === isEditing) 
        {
          return { ...value, name: itemName };
        }
        return value;
      }))
      setItemName("");
      setIsEdit(false);
      setIsEditing(null);
    } 
    else 
    {
      setListItems((value) => {
        return [...value, { name: itemName, id: nanoid() }];
      });
      setItemName("");
    }
  };

  const editItem = (id) => {
    const newItem = listItems.find((item) => item.id === id);
    setItemName(newItem.name);
    setIsEdit(!isEdit);
    setIsEditing(id);
  };

  const deleteItem = (id) => {
    const newItem = listItems.filter((item) => item.id !== id);
    setListItems(newItem);
  };

  const ListData = () => {
    const listMap = listItems.map((data, i) => (
      <Items
        key={i}
        id={data.id}
        name={data.name}
        remove={() => deleteItem(data.id)}
        edit={() => editItem(data.id)}
      />
    ));
    return listMap;
  };

  const clearItems=()=>{
    setListItems([])
    setIsEdit(false)
  }

  return (
    <main>
     <div className="form">
      <form onSubmit={handlechange}>
      <h3>To do list</h3>
        <input
          name="items"
          placeholder="eg. eggs"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <button>{isEdit ? "Edit" : "Add"}</button>
      </form>
     
       { listItems.length > 0 && ( <div> <ListData />
       <button className="last"  onClick={clearItems}>Clear All</button></div>)}    

       </div>
    </main>
  );
};

export default App;
