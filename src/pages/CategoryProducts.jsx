import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
      <h2 className="text-2xl font-bold mb-4">Products in {name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="card shadow p-4">
            <img src={product.image} alt={product.name} className="h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p>{product.brand}</p>
            <p className="font-bold text-primary">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
