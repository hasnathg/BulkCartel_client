import { useEffect, useState } from "react";
import { Link } from "react-router";
import CategoryCard from "./CategoryCard";


const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://bulk-cartel-server.vercel.app/categories") 
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <section className="max-w-[90%] mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Explore Bulk Cartel
        </h2>
        <p className="mt-2 text-gray-500">
          Discover popular product categories to shop in bulk.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category/${cat.name}`}
            className="group"
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border hover:border-gray-300 h-full flex flex-col min-h-[280px]">
              <div className="overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center flex-grow flex items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
