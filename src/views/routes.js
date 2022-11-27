import React from 'react';

import {
  Elearning as ElearningView,
  SigninSimple as SigninSimpleView,
  NotFound as NotFoundView,
  NotFoundCover as NotFoundCoverView,
} from 'views';

const routes = [
  {
    path: '/',
    renderer: (params = {}) => <ElearningView {...params} />,
  },
  {
    path: '/signin-simple',
    renderer: (params = {}) => <SigninSimpleView {...params} />,
  },
  {
    path: '/not-found',
    renderer: (params = {}) => <NotFoundView {...params} />,
  },
  {
    path: '/not-found-cover',
    renderer: (params = {}) => <NotFoundCoverView {...params} />,
  },
];

export default routes;
