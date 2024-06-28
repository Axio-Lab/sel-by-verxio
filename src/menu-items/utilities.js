// assets
import { 
  IconShoppingCart,
  IconCirclePlus,
  IconBuildingStore
 } from '@tabler/icons-react';

// ==============================|| EXPLORE MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Explore',
  type: 'group',
  children: [
    {
      id: 'createProduct',
      title: 'Create',
      type: 'item',
      url: '/explore/create-product',
      icon: IconCirclePlus,
      breadcrumbs: false
    },
    {
      id: 'productList',
      title: 'Product',
      type: 'item',
      url: '/explore/products',
      icon: IconBuildingStore,
      breadcrumbs: false
    },
    {
      id: 'myItem',
      title: 'My Item',
      type: 'item',
      url: '/explore/items',
      icon: IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default utilities;
