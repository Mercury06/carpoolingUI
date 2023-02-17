import React from 'react';
import { useDispatch } from 'react-redux';
import { createRide } from '../apiActions';
import moment from 'moment';
import { setSuggestedRidesActionCreator } from './../../../reducers/rideReducer.js';
import { useNavigate } from 'react-router-dom';
import { findLocality } from '../../../components/api/actions';
import useDebounce from '../../../Hooks/useDebounce';

function useForm(initialState, validate) {
  const [inputValues, setInputValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  //const [isSubmitting, setSubmitting] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [modifiedDate, setModifiedDate] = React.useState();
  const [targetName, setTargetName] = React.useState(null);
  //const deboucedSearch = useDebounce(findLocality, 1000);
  const deboucedSearch = useDebounce(findLocality, 1000);
  const initialStateDate = new Date();
  const modifiedInitialStateDate = moment(initialStateDate).format('YYYY-MM-DD');
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (isSubmitting) {
  //     const noErrors = Object.keys(errors).length === 0;
  //     if (noErrors) {
  //       setSubmitting(false);
  //     } else {
  //       setSubmitting(true);
  //     }
  //   }
  // }, [errors]);

  function handleChange(e) {
    let search = e.target.value;
    if (search === 0) {
      dispatch(setSuggestedRidesActionCreator([]));
      setTargetName(null);
      return;
    }
    setInputValues({
      ...inputValues,
      [e.target.name]: { localityName: e.target.value },
    });
    setTargetName(e.target.name);
    //console.log('e.target.name:', e.target.name);

    //console.log('targetName:', targetName);
    //dispatch(deboucedSearch(findLocality(search)));
    dispatch(findLocality(search));
    return;
  }
  //console.log('inputValues:', inputValues);
  // function handleBlur() {
  //   const validationErrors = validate(inputValues);
  //   setErrors(validationErrors);
  // }

  function onSuggestSelect1(e, { item }) {
    e.stopPropagation();
    inputValues.localityFrom.localityName = item.locality;
    inputValues.localityFrom.id = item._id;

    dispatch(setSuggestedRidesActionCreator([]));
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

    dispatch(setSuggestedRidesActionCreator([]));
    // console.log('e.target', e.target);
    // console.log('item._id', item._id);
    // console.log('item.localityFrom', item.locality);
    console.log('inputValues.destination.localityName:', inputValues.destination.localityName);
    console.log('inputValues.destination.id:', inputValues.destination.id);
    return;
  }
  async function createRideHandleSubmit(event) {
    event.preventDefault();
    await createRide(inputValues);
    // const result = await createRide(inputValues);
    // console.log('result:', result);
    // const redirect_path = result.data.redirect_path;
    // if (result.status === 200) navigate(redirect_path);
    //console.log('submit');
    //const validationErrors = validate(inputValues);
    //setErrors(validationErrors);
    //setSubmitting(true);
    //console.log(inputValues);
  }
  // async function findRidesHandleSubmit(event) {
  //   //debugger;
  //   event.preventDefault();
  //   await dispatch(setSearchRidesParamsActionCreator(inputValues));
  //   await dispatch(findRidesByParamsThunkCreator(inputValues));
  //   navigate('/rides-list');

  //   //findRidesByParamsApiAction(inputValues);
  //   //console.log('submit');
  //   //const validationErrors = validate(inputValues);
  //   //setErrors(validationErrors);
  //   //setSubmitting(true);
  //   //console.log(inputValues);
  // }

  const onChangeDateHandler = (value) => {
    //debugger;
    setStartDate(value);
    const modifiedDate = moment(value).format('YYYY-MM-DD');
    setModifiedDate(modifiedDate);
    //console.log('modifiedDate:', modifiedDate);
    setInputValues({
      ...inputValues,
      date: modifiedDate,
    });
  };

  return {
    createRideHandleSubmit,
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

export default useForm;
