import React from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const About = () => {
    return (
    <>
      <Helmet>
        <title>About | BulkCartel</title>
      </Helmet>

      <div className="bg-base-200">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-6 py-10">
          {/* Center the content block */}
          <div className="min-h-[70vh] grid place-items-center">
            <div className="max-w-3xl w-full bg-base-100 rounded-2xl shadow-md p-6 md:p-10 text-center">
              <span className="badge badge-accent">About BulkCartel</span>

              <h1 className="mt-3 text-3xl md:text-4xl font-bold">
                Connecting qualified buyers with verified suppliers—worldwide
              </h1>

              <p className="mt-3 opacity-80">
                BulkCartel is a B2B wholesale marketplace built for real volume.
                We help retailers, resellers, and institutions source products in bulk
                from trusted manufacturers and distributors—across electronics, home & kitchen,
                fashion & apparel, industrial tools & machinery, health & beauty, automotive parts,
                and office supplies.
              </p>

              {/* Value pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-xl bg-base-200">
                  <h3 className="font-semibold">Verified Suppliers</h3>
                  <p className="text-sm opacity-80">
                    Business profile checks, catalog reviews, and ratings to help you buy with confidence.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-base-200">
                  <h3 className="font-semibold">Built for Bulk</h3>
                  <p className="text-sm opacity-80">
                    Clear MOQs, tiered pricing, quotes, and quantity controls tailored for wholesale orders.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-base-200">
                  <h3 className="font-semibold">Logistics Friendly</h3>
                  <p className="text-sm opacity-80">
                    Shipping coordination, lead-time visibility, and documentation support for smooth delivery.
                  </p>
                </div>
              </div>

              {/* Who we serve */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="p-5 rounded-xl bg-base-200">
                  <h4 className="font-semibold">For Buyers</h4>
                  <ul className="mt-2 text-sm opacity-80 list-disc list-inside space-y-1">
                    <li>Source across multiple categories with transparent MOQs</li>
                    <li>Compare suppliers, pricing, and delivery options</li>
                    <li>Track orders and communicate in one place</li>
                  </ul>
                </div>
                <div className="p-5 rounded-xl bg-base-200">
                  <h4 className="font-semibold">For Suppliers</h4>
                  <ul className="mt-2 text-sm opacity-80 list-disc list-inside space-y-1">
                    <li>Showcase products to qualified B2B buyers</li>
                    <li>Receive RFQs and manage bulk pricing tiers</li>
                    <li>Streamline orders and fulfillment</li>
                  </ul>
                </div>
              </div>

              {/* How it works */}
              <div className="mt-8">
                <h4 className="font-semibold">How it works</h4>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-4 rounded-xl bg-base-200">
                    <div className="font-medium">1) Discover</div>
                    <div className="text-sm opacity-80">Browse categories or search by brand/specs.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-base-200">
                    <div className="font-medium">2) Request & Confirm</div>
                    <div className="text-sm opacity-80">Check MOQ, request quotes, confirm price & lead time.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-base-200">
                    <div className="font-medium">3) Order & Track</div>
                    <div className="text-sm opacity-80">Place bulk order, track status, and manage delivery.</div>
                  </div>
                </div>
              </div>

              {/* Trust & Safety */}
              <div className="mt-8 text-left">
                <h4 className="font-semibold">Trust & Safety</h4>
                <ul className="mt-2 text-sm opacity-80 list-disc list-inside space-y-1">
                  <li>Supplier vetting and buyer/seller ratings</li>
                  <li>Secure transactions and privacy-first account handling</li>
                  <li>Dispute assistance and order support</li>
                </ul>
              </div>

              
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link className="btn btn-primary" to="/all-products">Browse All Products</Link>
                <Link className="btn btn-outline" to="/register">Become a Supplier</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;