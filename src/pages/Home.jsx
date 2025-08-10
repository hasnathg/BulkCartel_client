import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { Helmet } from 'react-helmet-async';
import HowItWorks from '../components/HowItWorks';
import TrustedPartners from '../components/TrustedPartners';
import Newsletter from '../components/Newsletter';
import Spinner from '../components/Spinner';
import PrimeProduct from '../components/PrimeProduct';


const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner message="Preparing your dashboard..."/>;

    return (
        <>
      <Helmet>
        <title>Home | BulkCartel</title>
      </Helmet>
        <div>
          <Banner></Banner>
          <Categories></Categories>
          <PrimeProduct />
          <HowItWorks></HowItWorks>
          <TrustedPartners></TrustedPartners>
          <Newsletter></Newsletter>
          </div>
          </>
    );
};

export default Home;