import React, { FC } from 'react';

import Nav from '@components/Nav';
import Home from '@components/Home';
import { useInitializeStore } from '@components/customHooks';

const Page: FC = () => {
  // fetch portfolio, market, or history if empty
  useInitializeStore();

  return (
    <>
      <Nav />
      <Home />
    </>
  );
};

export default Page;
