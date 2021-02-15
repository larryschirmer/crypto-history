import React, { FC } from 'react';

import Nav from '@components/Nav';
import TokenForm from '@components/TokenForm';
import { useInitializeStore } from '@components/customHooks';

const Page: FC = () => {
  // fetch portfolio, market, or history if empty
  useInitializeStore();

  return (
    <>
      <Nav />
      <TokenForm />
    </>
  );
};

export default Page;
