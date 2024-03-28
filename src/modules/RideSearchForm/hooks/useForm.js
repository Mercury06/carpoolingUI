import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { findLocality } from "./../../../components/api/actions";
import moment from "moment";
import {
  findRidesByParamsThunkCreator,
  setSearchRidesParamsActionCreator,
  setSuggestedRidesActionCreator,
} from "./../../../reducers/rideReducer.js";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../Hooks/useDebounce";

function useFormValidation(initialState, setOpenCalendar, validate) {
  const [inputValues, setInputValues] = React.useState(initialState);
  //const [form, setForm] = React.useState({ localityFrom: '', destination: '', user: '', date: '' });
  const [errors, setErrors] = React.useState({});
  //const [isSubmitting, setSubmitting] = React.useState(false);

  const [targetName, setTargetName] = React.useState(null);
  const deboucedSearch = useDebounce(searchResolver, 500);

  // console.log("inputValues mounted", inputValues);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

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
  async function searchResolver(search) {
    //debugger;
    try {
      if (search !== "" || undefined) {
        const result = await findLocality(search);
        dispatch(setSuggestedRidesActionCreator(result));
      } else {
        dispatch(setSuggestedRidesActionCreator([]));
      }
    } catch (e) {
      console.log(e);
    }
  }
  const onClickClear = (inputName) => {
    //debugger;

    if (inputName === "input1") {
      setInputValues({
        ...inputValues,
        localityFrom: { localityName: "" },
      });
      inputRef1.current?.focus();
    }
    if (inputName === "input2") {
      setInputValues({
        ...inputValues,
        destination: { localityName: "" },
      });
      inputRef2.current?.focus();
    }
    dispatch(setSuggestedRidesActionCreator([]));
    //alert('object');
    //inputRef.current?.focus();
    return;
  };

  async function handleChange(e) {
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
    await deboucedSearch(search);
    return;
  }
  // console.log("inputValues:", inputValues);
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
    console.log(
      "inputValues.localityFrom.localityName:",
      inputValues.localityFrom.localityName
    );
    console.log("inputValues.localityFrom.id:", inputValues.localityFrom.id);
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
    console.log(
      "inputValues.destination.localityName:",
      inputValues.destination.localityName
    );
    console.log("inputValues.destination.id:", inputValues.destination.id);
    return;
  }

  async function findRidesHandleSubmit(event) {
    //debugger;
    event.preventDefault();
    console.log("inputValues", inputValues);
    // console.log("converted", moment("25 march 2024").format("YYYY-MM-DD"));
    dispatch(setSearchRidesParamsActionCreator(inputValues));
    dispatch(findRidesByParamsThunkCreator(inputValues));
    navigate("/rides-search");

    //findRidesByParamsApiAction(inputValues);
    //console.log('submit');
    //const validationErrors = validate(inputValues);
    //setErrors(validationErrors);
    //setSubmitting(true);
  }

  const onChangeDateHandler = (e) => {
    let day = e.target.id;

    if (day && day > 0) {
      // console.log("converted data", new Date(`2024-01-${day}`));
      let date = new Date(`2024-01-${day}`);

      // let modifiedDate = moment(date).format("YYYY-MM-DD");
      let modifiedDate = console.log("modifiedDate in handler", modifiedDate);
      setInputValues({
        ...inputValues,
        date: modifiedDate,
      });
      setOpenCalendar(false);
    } else {
      console.log("no ID");
      return;
    }
  };

  return {
    findRidesHandleSubmit,
    handleChange,
    // handleBlur,
    inputValues,
    setInputValues,
    errors,
    //isSubmitting,
    // modifiedDate,
    onChangeDateHandler,
    onSuggestSelect1,
    onSuggestSelect2,
    targetName,
    inputRef1,
    inputRef2,
    onClickClear,
    // modifiedInitialStateDate,
  };
}

export default useFormValidation;
