import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../componants/common/FormInput";
import SubmitButton from "../componants/common/SubmitButton";
import { api } from "../config";
import "./ItemForm.css";

function ItemForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // Use an empty string initially
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const result = await axios.get(`${api}/product_order/item/${params.id}`);
        const item = result.data;

        setName(item.name);
        setPrice(item.pric);
        setImage(`data:image/${item.imageType};base64,${item.dat}`);
      } catch (error) {
        console.error("Error fetching item:", error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    if (params.id) {
      fetchItem();
    }
  }, [params.id]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);

      // Ensure image is not empty before appending to FormData
      if (image) {
        const fileType = image.startsWith("data:image/png") ? "png" : "jpeg";
        

        // Convert the data URL back to a Blob
        const blob = await (await fetch(image)).blob();

        // Append Blob to FormData with a custom filename
        formData.append("image", blob, `file.${fileType}`);
      }

      if (params.id) {
        // await axios.put(`${api}/product_order/item/edit/${params.id}`, formData); //API GATEWAY STILL UNDERCONTRUCTION
        await axios.put(`http://localhost:4204/product_order/item/edit/${params.id}`, formData);
        toast.success("Item Updated Successfully");
      } else {
        // await axios.post(`${api}/product_order/item/add`, formData);   //API GATEWAY STILL UNDERCONTRUCTION
        await axios.post(`http://localhost:4204/product_order/item/add`, formData);
        toast.success("Item Added Successfully");
      }
      navigate("/admin/items");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="item-form-container">
      <h2 className="subtitle">{params.id ? "Edit" : "Add"} Item</h2>
      <form>
        <FormInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormInput label="Image" type="file" onChange={handleUpload} />
        {image && <img src={image} width="100px" height="100px" alt="Preview" />}

        <SubmitButton
          text={params.id ? "Update" : "Add"}
          className="submit-button"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default ItemForm;

