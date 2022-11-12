import React from 'react';
import { useDispatch } from 'react-redux';
import { createRide, findLocality } from '../components/api/actions';
import moment from 'moment';
import { setSuggestedRides } from '../reducers/rideReducer';

function useFormValidation(initialState, validate) {
  const [inputValues, setInputValues] = React.useState(initialState);
  //const [form, setForm] = React.useState({ localityFrom: '', destination: '', user: '', date: '' });
  const [errors, setErrors] = React.useState({});
  //const [isSubmitting, setSubmitting] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [modifiedDate, setModifiedDate] = React.useState();
  const [targetName, setTargetName] = React.useState(null);
  //const [open, setOpen] = React.useState(false);

  const initialStateDate = new Date();
  const modifiedInitialStateDate = moment(initialStateDate).format('YYYY-MM-DD');
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (isSubmitting) {
  //     const noErrors = Object.keys(errors).length === 0;
  //     if (noErrors) {
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
      setTargetName(null);
      return;
    }
    setInputValues({
      ...inputValues,
      [e.target.name]: { localityName: e.target.value },
    });
    setTargetName(e.target.name);
    //console.log('e.target.name:', e.target.name);

    console.log('targetName:', targetName);
    dispatch(findLocality(search));
    return;
  }
  console.log('inputValues:', inputValues);
  // function handleBlur() {
  //   const validationErrors = validate(inputValues);
  //   setErrors(validationErrors);
  // }

  // function onSuggestSelect(e, { item }) {
  //   setSelectedItem(item);
  //   setFromInputValue(item);
  //   dispatch(setSuggestedRides([]));
  // }
  function onSuggestSelect1(e, { item }) {
    e.stopPropagation();
    inputValues.localityFrom.localityName = item.locality;
    inputValues.localityFrom.id = item._id;

    dispatch(setSuggestedRides([]));
    // console.log('e.target', e.target);
    // console.log('item.localityFrom', item.locality);
    // console.log('item._id', item._id);
    console.log('inputValues.localityFrom.localityName:', inputValues.localityFrom.localityName);
    console.log('inputValues.localityFrom.id:', inputValues.localityFrom.id);
    return;
  }
  function onSuggestSelect2(e, { item }) {
    e.stopPropagation();
    inputValues.destination.localityName = item.locality;
    inputValues.destination.id = item._id;

    dispatch(setSuggestedRides([]));
    // console.log('e.target', e.target);

    // console.log('item._id', item._id);
    // console.log('item.localityFrom', item.locality);
    console.log('inputValues.destination.localityName:', inputValues.destination.localityName);
    console.log('inputValues.destination.id:', inputValues.destination.id);
    return;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await createRide(inputValues);
    //console.log('submit');
    //const validationErrors = validate(inputValues);
    //setErrors(validationErrors);
    //setSubmitting(true);
    //console.log(inputValues);
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
    //isSubmitting,
    startDate,
    modifiedDate,
    onChangeDateHandler,
    onSuggestSelect1,
    onSuggestSelect2,
    targetName,
    modifiedInitialStateDate,
  };
}

export default useFormValidation;
