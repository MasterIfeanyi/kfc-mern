import React from "react";
import { Container } from "@mui/system";
export default function OrderHistory() {
  return (
    <>
      <h1>Order History</h1>
      <div className="order-history">
        <span>You have no orders in your history right now.</span>
      </div>
    </>
  );
}