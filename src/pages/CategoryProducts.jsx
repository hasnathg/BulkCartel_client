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
 
  <section className="w-full bg-base-200">
    <div className="w-full max-w-screen-xl mx-auto px-6 py-10 text-base-content">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Products in {name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  </section>
  );
};

export default CategoryProducts;
