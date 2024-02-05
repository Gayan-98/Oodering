import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Select, VStack } from "@chakra-ui/react";
import "./AddInventoryItems.css"; // Import the CSS file

function AddInventoryItems() {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState(""); // State for category

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission
    };

    return (
        <VStack className="form-container" spacing={4}>
            <form onSubmit={handleSubmit}>
                <FormControl className="form-control" id="itemName">
                    <FormLabel className="form-label">Item Name</FormLabel>
                    <Input
                        className="form-input"
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </FormControl>
                <FormControl className="form-control" id="quantity">
                    <FormLabel className="form-label">Quantity</FormLabel>
                    <Input
                        className="form-input"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormControl>
                <FormControl className="form-control" id="category">
                    <FormLabel className="form-label">Category</FormLabel>
                    <Select
                        className="form-input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="appetizers">Appetizers</option>
                        <option value="mainCourse">Main Course</option>
                        <option value="desserts">Desserts</option>
                        <option value="drinks">Drinks</option>
                    </Select>
                </FormControl>
                {/* Add image upload field here if needed */}
                <Button className="submit-btn" type="submit" colorScheme="green">
                    Add Item
                </Button>
            </form>
        </VStack>
    );
}

export default AddInventoryItems;
