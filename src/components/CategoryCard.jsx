import { Link } from "react-router";


const CategoryCard = ({ category }) => {
  return (
    <Link to={`/category/${category.name}`}>
      <div className="p-4 rounded-lg shadow-md bg-white hover:scale-105 duration-300 text-center">
        <img
          src={category.image}
          alt={category.name}
          className="h-40 mx-auto object-cover rounded"
        />
        <h2 className="text-lg font-bold mt-2">{category.name}</h2>
      </div>
    </Link>
  );
};

export default CategoryCard;
