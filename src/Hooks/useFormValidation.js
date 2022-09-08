import React from 'react';
import { useDispatch } from 'react-redux';
import { createRide } from '../components/api/actions';
import moment from 'moment';

function useFormValidation(initialState, validate) {
  const [values, setValues] = React.useState(initialState);
  const [form, setForm] = React.useState({ localityFrom: '', destination: '', user: '', date: '' });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [modifiedDate, setModifiedDate] = React.useState();

  const initialStateDate = new Date();
  const modifiedInitialStateDate = moment(initialStateDate).format('YYYY-MM-DD');
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('authenticated!', values.email, values.password);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
    console.log(values);
    await createRide(values);
  }

  const onChangeDateHandler = (value) => {
    setStartDate(value);
    const modifiedDate = moment(value).format('YYYY-MM-DD');
    setModifiedDate(modifiedDate);
    initialState.date = modifiedDate;
    console.log('initialState.date:', initialState.date);
  };

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
    startDate,
    modifiedDate,
    onChangeDateHandler,
    modifiedInitialStateDate,
  };
}

export default useFormValidation;
