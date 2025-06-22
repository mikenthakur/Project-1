import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import axios from "axios";
import { toast } from "react-toastify";

const FoodDisplay = ({ category }) => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/food/list");
        if (response.data.success) {
          setFoodList(response.data.data);
        } else {
          toast.error("Failed to fetch food items");
        }
      } catch (error) {
        console.error("Error fetching food:", error);
        toast.error("Error fetching food items");
      }
    };

    fetchFood();
  }, []);

  const filteredList = foodList?.filter(
    (item) => category === "All" || item.category === category
  );

  return (
    <div id="food-display" className="px-4 sm:px-6 md:px-10 py-6">
      <h2 className="font-bold text-2xl sm:text-3xl mb-6 text-gray-800 text-center sm:text-left">
        Top Dishes Near You
      </h2>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredList?.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={`http://localhost:4000/images/${item.image}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
