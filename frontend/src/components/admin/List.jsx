import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/food/list");
      if (response.data.success) {  // ✅ FIXED: correct spelling of 'success'
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Fetch list error:", error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/food/remove", {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error removing item");
      console.error("Remove food error:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="p-4 w-full">
        <p className="text-xl font-semibold mb-4">All Food List</p>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-4 bg-gray-100 p-3 font-semibold text-sm text-gray-700">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>

          {list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 items-center p-3 border-b hover:bg-gray-50"
            >
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <p className="text-sm">{item.name}</p>
              <p className="text-sm">{item.category}</p>
              <p className="text-sm">Rs {item.price}</p>
              <button
                onClick={() => removeFood(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
