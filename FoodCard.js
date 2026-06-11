function FoodCard({ food, cart, setCart }) {

  const handleAddCart = () => {

    const existingItem = cart.find(
  (item) => item._id === food._id
);

    if (existingItem) {

      const updatedCart = cart.map((item) =>
        item._id === food._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);

    }

    alert("Item Added To Cart");
  };

  return (
    <div
      style={{
        width: "260px",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.2)",
        backgroundColor: "white",
        transition: "0.3s",
      }}
    >

      <img
  src={food.image}
  alt={food.name}
  onError={(e) => {
    console.log("Image Failed:", food.image);
  }}
  style={{
    width: "100%",
    height: "200px",
    objectFit: "cover",
  }}
/>

      <div
        style={{
          padding: "15px",
        }}
      >

        <h2>{food.name}</h2>

        <h3
          style={{
            color: "#ff6b00",
          }}
        >
          ₹ {food.price}
        </h3>

        <button
          onClick={handleAddCart}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#ff6b00",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add To Cart
        </button>

      </div>
    </div>
  );
}

export default FoodCard;