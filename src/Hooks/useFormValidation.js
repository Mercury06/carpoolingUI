import React from 'react';
import { useDispatch } from 'react-redux';
import { createRide, findLocality } from '../components/api/actions';
import moment from 'moment';
import { setSuggestedRides } from '../reducers/rideReducer';

function useFormValidation(initialState, validate) {
  const [inputValues, setInputValues] = React.useState(initialState);
  //const [form, setForm] = React.useState({ localityFrom: '', destination: '', user: '', date: '' });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [modifiedDate, setModifiedDate] = React.useState();

  const initialStateDate = new Date();
  const modifiedInitialStateDate = moment(initialStateDate).format('YYYY-MM-DD');
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (isSubmitting) {
  //     const noErrors = Object.keys(errors).length === 0;
  //     if (noErrors) {
  //       console.log('authenticated!', values.email, values.password);
  //       setSubmitting(false);
  //     } else {
  //       setSubmitting(false);
  //     }
  //   }
  // }, [errors]);

  function handleChange(e) {
    let search = e.target.value;
    if (search === 0) {
      dispatch(setSuggestedRides([]));
      return;
    }
    setInputValues({
      ...inputValues,
      [e.target.name]: { localityName: e.target.value },
    });
    dispatch(findLocality(search));
    return;
  }
  console.log('inputValues:', inputValues);
  //console.log('initialState:', initialState);
  // function handleBlur() {
  //   const validationErrors = validate(inputValues);
  //   setErrors(validationErrors);
  // }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(inputValues);
    setErrors(validationErrors);
    setSubmitting(true);
    //console.log(inputValues);
    await createRide(inputValues);
  }

  const onChangeDateHandler = (value) => {
    setStartDate(value);
    const modifiedDate = moment(value).format('YYYY-MM-DD');
    setModifiedDate(modifiedDate);
    initialState.date = modifiedDate;
    //console.log('initialState.date:', initialState.date);
  };

  return {
    handleSubmit,
    handleChange,
    // handleBlur,
    inputValues,
    errors,
    isSubmitting,
    startDate,
    modifiedDate,
    onChangeDateHandler,
    modifiedInitialStateDate,
  };
}

export default useFormValidation;
