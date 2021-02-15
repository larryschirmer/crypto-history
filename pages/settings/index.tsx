import React, { FC } from 'react';

import Nav from '@components/Nav';
import Settings from '@components/Settings';
import { useInitializeStore } from '@components/customHooks';

const Page: FC = () => {
  // fetch portfolio, market, or history if empty
  useInitializeStore();

  return (
    <>
      <Nav />
      <Settings />
    </>
  );
};

export default Page;
