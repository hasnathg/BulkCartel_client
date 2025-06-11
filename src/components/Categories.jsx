import { useEffect, useState } from "react";
import { Link } from "react-router";
import CategoryCard from "./CategoryCard";


const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/categories") 
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="grid md:grid-cols-4 gap-6 p-6">
      {categories.map((cat) => (
        <Link key={cat.name} to={`/category/${cat.name}`}>
          <div className="card shadow-md hover:shadow-xl transition-all duration-300">
            <img src={cat.image} alt={cat.name} className="rounded-t-xl h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{cat.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
