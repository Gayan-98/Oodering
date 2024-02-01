import { useEffect, useState } from "react";
import "./MainMenu.css";
import axios from "axios";
import { api } from "../config";
import ManuItem from "./MenuItem";
import toast from "react-hot-toast";

function MainMenu({ cartItem, setCartItem }) {
  const [items, setItems] = useState([]);

  //call to backend api to get items
  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios.get(`${api}/product_order/item/all`);

      setItems(result.data);
    };

    fetchItem();
  }, []);

  const handleclick = (clickedItem) => {

   const found= cartItem.find((item)=>{
      if(item.id== clickedItem.id){
        return true;
      }else
        return false;
    })

    if(found){
        toast.error("item olredy added");
        return;
    }


    const newCartItem = [...cartItem];

    

    const newItem = {
      ...clickedItem,
      qty: 1,
    };

    newCartItem.push(newItem);
    setCartItem(newCartItem);
  };

  return (
    <div className="main-menu-container">
      {items.map((item) => {
        return (
          <ManuItem
            key={item.id}
            item={item}
            ONclick={() => {
              handleclick(item);
            }}
          />
        );
      })}
    </div>
  );
}
export default MainMenu;
