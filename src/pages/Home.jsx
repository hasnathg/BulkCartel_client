import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { Helmet } from 'react-helmet-async';
import HowItWorks from '../components/HowItWorks';
import TrustedPartners from '../components/TrustedPartners';
import Newsletter from '../components/Newsletter';


const Home = () => {
    return (
        <>
      <Helmet>
        <title>Home | BulkCartel</title>
      </Helmet>
        <div>
          <Banner></Banner>
          <Categories></Categories>
          <HowItWorks></HowItWorks>
          <TrustedPartners></TrustedPartners>
          <Newsletter></Newsletter>
          </div>
          </>
    );
};

export default Home;