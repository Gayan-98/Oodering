import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../config";
import "./Items.css";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Items() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios.get(`${api}/product_order/item/all`);
      setItems(result.data);
    };

    fetchItems();
  }, []);

  return (
    <div className="items-container">
      <h2 className="subtitle">Menu Items</h2>
      <Link to="/admin/item-form">
        <Button
          colorScheme="blue"
          variant="outline"
          leftIcon={<AddIcon w={4} h={4} />}
        >
          Add Item
        </Button>
      </Link>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Price</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td isNumeric>{item.pric}</Td>
                <Td>
                  {/* <img src={`${api}${item.image}`} alt="" /> */}
                  <img src={`data:image/${item.imageType};base64,${item.dat}`} alt="image" />
                  
                </Td>
                <Td>
                  <Link to={`/admin/item-form/${item.id}`}>
                    <Button colorScheme="yellow" variant="outline">
                      Edit
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Items;
