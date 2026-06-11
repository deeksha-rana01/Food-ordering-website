import axios from "axios";

function CartPage({ cart, setCart }) {

    const handleRemove = (indexValue) => {
  const updatedCart = cart.filter(
    (_, index) => index !== indexValue
  );

  setCart(updatedCart);
};

const increaseQuantity = (id) => {

  const updatedCart = cart.map((item) =>
    item._id === id
      ? {
          ...item,
          quantity: item.quantity + 1,
        }
      : item
  );

  setCart(updatedCart);
};

const decreaseQuantity = (id) => {

  const updatedCart = cart
    .map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    )
    .filter((item) => item.quantity > 0);

  setCart(updatedCart);
};

const totalPrice = cart.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

 const handleOrder = async () => {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {

    const totalPrice = cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const { data } = await axios.post(
      "http://localhost:5000/api/v1/order/place-order",
      {
        items: cart,
        totalPrice,
      }
    );

    if (data.success) {
      alert("Order Placed Successfully!");
      setCart([]);
    }

  } catch (error) {
    console.log(error);
    alert("Order Failed");
  }
};

  return (
    <div
  style={{
    padding: "30px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  }}
>
      <h1>Cart Page</h1>

<h2>Total Price: ₹ {totalPrice}</h2>
<button
  onClick={handleOrder}
  style={{
    padding: "12px 20px",
    backgroundColor: "#ff6b00",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  }}
>
  Place Order
</button>
      {cart.map((item, index) => (
        <div
          key={index}
          style={{
  backgroundColor: "white",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
  boxShadow:
    "0 2px 8px rgba(0,0,0,0.1)",
}}
        >
          

          <h2>{item.name}</h2>

          <h3>₹ {item.price}</h3>
          <h3>Quantity: {item.quantity}</h3>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  }}
>
  <button
    onClick={() =>
      decreaseQuantity(item._id)
    }
  >
    -
  </button>

  <button
    onClick={() =>
      increaseQuantity(item._id)
    }
  >
    +
  </button>
</div>

          <button
             onClick={() => handleRemove(index)}>
             Remove
</button>

        </div>
      ))}
    </div>
  );
}

export default CartPage;