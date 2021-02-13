import React, { FC } from 'react';

import styles from './Placeholder.module.scss';

const { placeholder: placeHolderClass } = styles;

const PlaceHolder: FC<{}> = ({}) => {
  return <div>Placeholder</div>;
};

export default PlaceHolder;
