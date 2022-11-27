import React from 'react';

// Building blocks storeNavigation components
import {
  IndexView as StoreNavigationIndexView,
  NavWithCenteredSearch as NavWithCenteredSearchView,
} from 'blocks/storeNavigation';

const routes = [
  {
    path: '/blocks/store-navigation',
    renderer: (params = {}) => <StoreNavigationIndexView {...params} />,
  },
  {
    path: '/blocks/store-navigation/nav-with-centered-search',
    renderer: (params = {}) => <NavWithCenteredSearchView {...params} />,
  },
];

export default routes;
