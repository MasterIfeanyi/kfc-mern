import React, { useContext, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import addonContext from "../../context/addonContext";

export default function AddonItem({ addon, index }) {
  const context = useContext(addonContext);
  const { addonQuantity } = context;
  const [quantity, setQuantity] = useState({
    id: "",
    quantity: "",
  });
  // handle whcn clicked on add icon
  const handleAdd = (e, id) => {
    e.target.parentElement.style.display = "none";
    e.target.parentElement.nextSibling.style.display = "flex";
    setQuantity({
      id: id,
      quantity: 1,
    });
    addonQuantity.push({ id: id, quantity: 1 });
  };

  //handle when clicked on either + or -
  const handleQuantity = (operator, e, id) => {
    const filteredAddon = addonQuantity.filter((addonCheck) => {
      return addonCheck.id === id;
    });
    if (operator === "+") {
      const newQuantity = quantity.quantity + 1;
      setQuantity({
        id: id,
        quantity: newQuantity,
      });
      filteredAddon[0].quantity = newQuantity;
    } else {
      if (quantity.quantity === 0) {
        return;
      }
      const newQuantity = quantity.quantity - 1;
      setQuantity({
        id: id,
        quantity: newQuantity,
      });
      filteredAddon[0].quantity = newQuantity;
    }
  };
  return (
    <>
      <div className="img">
        <img src={addon.pic} alt="Addon" width={30} />
      </div>
      <div className="addon-name">
        <span>{addon.name}</span>
        <span className="addon-price">Rs {addon.price}</span>
      </div>
      <div className="addon-add" style={{ display: "flex", width: "7vw" }}>
        <span onClick={(e) => handleAdd(e, addon._id)}>+ Add</span>
      </div>
      <div className="addon-quantity" style={{ display: "none", width: "7vw" }}>
        <Remove onClick={(e) => handleQuantity("-", e, addon._id)} />
        <span>{quantity.quantity}</span>
        <Add onClick={(e) => handleQuantity("+", e, addon._id)} />
      </div>
    </>
  );
}