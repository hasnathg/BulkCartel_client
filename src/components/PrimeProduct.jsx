import React from 'react';
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import Rating from "react-rating-stars-component";
import Spinner from "../components/Spinner";

const API = "https://bulk-cartel-server.vercel.app";

const PrimeProduct = () => {
     const [loading, setLoading] = useState(true);
  const [prime, setPrime] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        // get categories
        const catRes = await fetch(`${API}/categories`);
        const catData = await catRes.json();
        const names = Array.isArray(catData) ? catData.map(c => c.name) : [];

        
        const pick = names.slice(0, 6);

        
        const perCategory = await Promise.all(
          pick.map(async (name) => {
            const res = await fetch(`${API}/products/category/${encodeURIComponent(name)}`);
            const data = await res.json();
            if (!Array.isArray(data)) return [];
            // grab up to 1 prime item per category 
            return data.slice(0, 1).map(p => ({ ...p, _categoryName: name }));
          })
        );

        const merged = perCategory.flat().filter(Boolean);
        if (mounted) setPrime(merged);
      } catch (e) {
        console.error("PrimeProducts load error:", e);
        if (mounted) setPrime([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <Spinner message="Curating prime picks..." />;

  if (!prime.length) return null;
    return (
        <section className="w-full">
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-12 text-base-content">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold">Prime Products</h2>
          <p className="mt-2 opacity-70">Hand-picked items from top categories</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
          {prime.map((p) => (
            <article
              key={p._id}
              className="bg-base-100 border rounded-2xl shadow-sm hover:shadow-md transition p-4 h-full flex flex-col"
            >
              {/* image */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-4 bg-base-200">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>

              {/* content */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-semibold leading-tight text-center line-clamp-1 min-h-[1.75rem]">
                  {p.name}
                </h3>
                <p className="text-sm opacity-80 mt-1 text-center line-clamp-2 min-h-[3.25rem]">
                  {p.description || " "}
                </p>

                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="badge badge-ghost">
                    {p._categoryName || p.category}
                  </span>
                  <span className="text-lg font-bold text-primary">${p.price}</span>
                </div>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <span className="text-sm opacity-80">
                    Min Qty: {p.minimum_selling_quantity}
                  </span>
                  <Rating value={p.rating} edit={false} size={18} />
                </div>

                {/* actions pinned to bottom, equal widths */}
                <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
                  <Link
                    to={`/category/${encodeURIComponent(p._categoryName || p.category)}`}
                    className="btn btn-sm btn-outline w-full"
                  >
                    See Category
                  </Link>

                  <Link
                    to={`/products/${p._id}`}
                    className="w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition text-sm font-medium inline-flex items-center justify-center"
                    role="button"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    );
};

export default PrimeProduct;