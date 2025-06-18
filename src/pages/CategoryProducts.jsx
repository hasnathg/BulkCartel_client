import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";
import Spinner from "../components/Spinner";

const CategoryProducts = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `${name} | BulkCartel`;
    fetch(`https://bulk-cartel-server.vercel.app/products/category/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
    })
      .catch(err => {
      console.error("Error fetching category:", err);
      setLoading(false); 
    });
  }, [name]);
  if (loading) return <Spinner  message="Loading product..." />;


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
