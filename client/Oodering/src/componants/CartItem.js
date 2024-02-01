import { IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { api } from "../config";

function CartItem({ item, handleAdd, handleReduce, handleRemove }) {
  return (
    <div className="cart-item-container">      
      <img src={`data:image/jpeg;base64,${item.dat}`} alt="image" />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <h5 className="cart-item--price">
          {item.pric} x {item.qty}
        </h5>

        <div className="add-delete-btns">
          <IconButton
            size="sm"
            colorScheme="blue"
            icon={<AddIcon w={3} h={3} />}
            onClick={handleAdd}
          />
          <IconButton
            size="sm"
            colorScheme="yellow"
            icon={<CloseIcon w={3} h={3} />}
            onClick={handleReduce}
          />
        </div>
      </div>

      <IconButton
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={handleRemove}
      />
    </div>
  );
}
export default CartItem;
