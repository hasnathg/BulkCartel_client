import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <>
      <Helmet>
        <title>Home | BulkCartel</title>
      </Helmet>
        <div>
          <Banner></Banner>
          <Categories></Categories>
          </div>
          </>
    );
};

export default Home;