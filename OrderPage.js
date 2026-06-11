import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderPage() {

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {

      const { data } = await axios.get(
        "http://localhost:5000/api/v1/order/get-orders"
      );

      if (data.success) {
        setOrders(data.orders);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid lightgray",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>
            Total Price: ₹ {order.totalPrice}
          </h3>

          {order.items.map((item) => (
            <p key={item._id}>
              {item.name} × {item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderPage;