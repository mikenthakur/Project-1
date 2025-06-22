import React from 'react';
import { menu_list } from '../../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='flex flex-col gap-5' id='explore-menu'>
      <h1 className='text-gray-700 text-2xl'>Explore Our Menu</h1>
      <p className='max-w-80'>
        Choose from a diverse menu featuring a delectable array of dishes. Our aim is to serve healthy and tasty meals.
      </p>

      {/* Grid Layout for Menu Items */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 text-center'>
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))
            }
            className="cursor-pointer"
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`mx-auto sm:h-24 sm:w-24 md:h-32 md:w-32 w-28 h-28 rounded-full border-4 ${
                category === item.menu_name ? 'border-green-500' : 'border-transparent'
              } transition duration-300`}
            />
            <p className='mt-2 font-medium text-gray-700'>{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr className='mt-8 border-t-2 border-gray-200 w-full' />
    </div>
  );
};

export default ExploreMenu;
