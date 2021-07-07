import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Typeahead from '@components/Typeahead';
import { Token } from '@redux/portfolio/types';
import { operations } from '@redux/portfolio';
import { RootState } from '@redux/index';
import validIds from '@lib/validIds.json';

import styles from './TokenForm.module.scss';

const { updatePortfolio } = operations;
const {
  'token-form': tokenFormClass,
  'input-section': inputSectionClass,
  'form-actions': formActionsClass,
  'cancel-btn': cancelBtnClass,
  'submit-btn': submitBtnClass,
  error: errorClass,
} = styles;

const TokenForm: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { portfolio } = useSelector(({ portfolio }: RootState) => ({
    portfolio: portfolio.data,
  }));
  const editId = router.asPath.replace('/settings/', '');

  const handleOpenSettings = () => {
    router.push('/settings');
  };

  const initialValues = portfolio.find(({ name }) => name === editId) ?? {
    name: '',
    amount: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test('is-valid-token-id', 'please enter valid token id', (val) => validIds.includes(val))
      .required(),
    amount: Yup.string()
      .matches(/^\d*\.?\d*$/, 'Please use only numbers')
      .required(),
  });
  const onSubmit = (values: Token) => {
    dispatch(updatePortfolio(values));
    handleOpenSettings();
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div className={tokenFormClass}>
      <form onSubmit={formik.handleSubmit}>
        <div className={inputSectionClass}>
          <Typeahead
            label="Name"
            name="name"
            placeholder="token name"
            onChange={(val: string) => formik.setFieldValue('name', val)}
            value={formik.values.name}
            touched={formik.touched.name}
            error={formik.errors.name}
            list={validIds}
          />
        </div>
        <div className={inputSectionClass}>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="amount"
            placeholder="100"
            onChange={formik.handleChange}
            value={formik.values.amount}
          />
          {formik.errors.amount && formik.touched.amount && (
            <div className={errorClass}>{formik.errors.amount}</div>
          )}
        </div>
        <div className={formActionsClass}>
          <button onClick={handleOpenSettings} className={cancelBtnClass}>
            Cancel
          </button>
          <button type="submit" disabled={!formik.isValid} className={submitBtnClass}>
            {editId === 'new' ? 'Add' : 'Edit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TokenForm;
