import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layout/MainLayout';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CategoryProducts from '../pages/CategoryProducts';
import AllProducts from '../pages/AllProducts';
import AddProduct from '../pages/AddProduct';
import PrivateRoute from '../components/PrivateRoute';
import MyProducts from '../pages/MyProducts';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import UpdateProduct from '../pages/UpdateProduct';
import About from '../pages/About';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
   
    children: [
        {path: "/",
            element: <Home></Home>
        },
        {path: "/login",
            element: <Login></Login>
        },
        {path: "/register",
            element: <Register></Register>
        },
        { path: "/about", element: <About /> },
        {path: "/category/:name",
            element: <CategoryProducts></CategoryProducts>
        },
        {path: "/all-products",
            element: <PrivateRoute>
                <AllProducts></AllProducts>
            </PrivateRoute>
            
        },
        {path: "/add-product",
            element: <PrivateRoute>
               <AddProduct></AddProduct>
            </PrivateRoute>
        },
        {path: "/my-product",
            element: <PrivateRoute>
              <MyProducts></MyProducts>
            </PrivateRoute>
        },
        {path: "/cart",
            element: <PrivateRoute>
             <Cart></Cart>
            </PrivateRoute>
        },
        {path: "/products/:id",
            element: <PrivateRoute>
             <ProductDetails></ProductDetails>
            </PrivateRoute>
        },
        {path: "/update/:id",
        element: (
        <PrivateRoute>
        <UpdateProduct />
        </PrivateRoute>
  ),

        },
    ]
},
{
    path: "*",
    element: <NotFound></NotFound>,
},

]);

export default router;