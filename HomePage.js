import axios from "axios";
import React, { useEffect, useState } from "react";
import foodData from "../data/foodData";
import FoodCard from "../components/FoodCard";

function HomePage({ cart, setCart }) {
  const [foods, setFoods] = useState([]);

const getAllFoods = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/food/get-foods"
    );

    if (data.success) {
      console.log(data.foods);
      setFoods(data.foods);
    }
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getAllFoods();
}, []);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const filteredFoods = foods.filter(
  (food) => {

    const searchMatch =
      food.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =
      category === "All"
        ? true
        : food.category === category;

    return searchMatch && categoryMatch;
  }
);

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
  style={{
    color: "#ff6b00",
    marginBottom: "20px",
  }}
>
  Food Ordering App
</h1>
      <input
  type="text"
  placeholder="Search Food..."

  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
  padding: "12px",
  width: "300px",
  borderRadius: "8px",
  border: "1px solid lightgray",
  outline: "none",
  marginBottom: "20px",
  fontSize: "16px",
}}
/>
<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>
<button onClick={() => setCategory("All")}>All</button>

<button onClick={() => setCategory("Burger")}>Burger</button>

<button onClick={() => setCategory("Pizza")}>Pizza</button>

<button onClick={() => setCategory("Pasta")}>Pasta</button>

<button onClick={() => setCategory("Sandwich")}>Sandwich</button>

<button onClick={() => setCategory("Chinese")}>Chinese</button>

<button onClick={() => setCategory("North Indian")}>North Indian</button>

<button onClick={() => setCategory("South Indian")}>South Indian</button>

<button onClick={() => setCategory("Beverage")}>Beverage</button>

<button onClick={() => setCategory("Dessert")}>Dessert</button>
</div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
       {filteredFoods.map((food) => (
          <FoodCard
  key={food._id}
  food={food}
  cart={cart}
  setCart={setCart}
/>
        ))}
      </div>
    </div>
  );
}

export default HomePage;