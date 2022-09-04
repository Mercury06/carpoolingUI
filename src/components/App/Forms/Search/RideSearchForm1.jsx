import React from 'react';
import useFormValidation from '../../../../Hooks/useFormValidation';

import s from './rideSearchForm.module.scss';
import validateAuth from './validateAuth';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const RideSearchForm1 = (props) => {
  const { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting } =
    useFormValidation(INITIAL_STATE, validateAuth);
  return (
    <>
      <div className={s.container}>
        <form onSubmit={handleSubmit}>
          <h3>Create ride form</h3>
          <div>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              value={values.email}
              className={errors.email && 'error-input'}
              autoComplete="off"
              placeholder="Your email address"
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}
          <div>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={errors.password && 'error-input'}
              name="password"
              type="password"
              placeholder="Choose a safe password"
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
          <div>
            <button disabled={isSubmitting} type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RideSearchForm1;
