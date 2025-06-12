import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";

const CategoryProducts = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.title = `${name} | BulkCartel`;
    fetch(`http://localhost:3000/products/category/${name}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [name]);

  return (
   <div className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Products in {name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
