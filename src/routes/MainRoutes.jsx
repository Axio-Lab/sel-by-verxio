import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// Explore routing
const Products = Loadable(lazy(() => import('explore/ProductTable')))
const CreateProduct = Loadable(lazy(() => import('explore/CreateProduct')))
const MyItems = Loadable(lazy(() => import('explore/MyItems')))
const Customers = Loadable(lazy(() => import('explore/Customers')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'explore',
      children: [
        {
          path: 'create-product',
          element: <CreateProduct/>
        },
        {
          path: 'products',
          element: <Products/>
        },
        {
          path: 'items',
          element: <MyItems/>
        },
        {
          path: 'customers/:productName',
          element: <Customers/>
        }
      ]
    }
  ]
};

export default MainRoutes;
