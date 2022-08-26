import React, { useContext, useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import addonContext from "../../context/addonContext";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

export default function AddonItem({ addon, index, prod_id }) {
  const ref = useRef();
  const { cartItems } = useSelector((store) => store.cart);
  const context = useContext(addonContext);

  const { addonQuantity, setAddonQuantity } = context;
  const [quantity, setQuantity] = useState({
    addon: "",
    quantity: "",
  });
  // handle whcn clicked on add icon
  const handleAdd = (e, addon) => {
    e.target.parentElement.style.display = "none";
    e.target.parentElement.nextSibling.style.display = "flex";
    setQuantity({
      addon: addon,
      quantity: 1,
    });
    setAddonQuantity(addonQuantity.concat({ addon: addon, quantity: 1 }));
  };

  //handle when clicked on either + or -
  const handleQuantity = (operator, e, addon) => {
    const filteredAddon = addonQuantity.find(
      (addonCheck) => addonCheck.addon._id === addon._id
    );
    if (operator === "+") {
      const newQuantity = quantity.quantity + 1;
      setQuantity({
        addon: addon,
        quantity: newQuantity,
      });
      filteredAddon.quantity = newQuantity;
    } else {
      if (quantity.quantity === 0) {
        return;
      }
      const newQuantity = quantity.quantity - 1;
      setQuantity({
        addon: addon,
        quantity: newQuantity,
      });
      filteredAddon.quantity = newQuantity;
    }
  };

  const checkAddon = (prod_id) => {
    const checkFilter = cartItems.find((item) => item.prod_id === prod_id);
    // check if product not exist in cart items then return it
    if (checkFilter === undefined) {
      return;
    }
    const checkAddon = checkFilter.addons.find(
      (item) => item.addon._id === addon._id
    );
    if (checkAddon === undefined) {
      return;
    } else {
      ref.current.parentElement.style.display = "none";
      ref.current.parentElement.nextSibling.style.display = "flex";
      setQuantity({ addon, quantity: checkAddon.quantity });
      setAddonQuantity(
        addonQuantity.concat({ addon: addon, quantity: checkAddon.quantity })
      );
    }
  };

  useEffect(() => {
    //check if addon is with product or not
    checkAddon(prod_id);
    //eslint-disable-next-line
  }, []);

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
        <span onClick={(e) => handleAdd(e, addon)} ref={ref}>
          + Add
        </span>
      </div>
      <div className="addon-quantity" style={{ display: "none", width: "7vw" }}>
        <Remove onClick={(e) => handleQuantity("-", e, addon)} />
        <span>{quantity.quantity}</span>
        <Add onClick={(e) => handleQuantity("+", e, addon)} />
      </div>
    </>
  );
}
