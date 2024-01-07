export default function validateForm(e) {
  let errors = {};

  //   if (e.target.name === "firstName" && value.trim() !== "") {
  //     if (!/^[A-Za-z]+/.test(value)) {
  //       errors.firstName = "enter a valid characters";
  //     } else if (value.length < 4) {
  //       console.log("value.length < 4", value);
  //       errors.firstName = "sign 4 characters or more";
  //     } else if (value.length < 1 || value === "") {
  //       errors.firstName = null;
  //     } else if (value.length > 3) {
  //       errors.firstName = null;
  //     } else errors.firstName = null;
  //   }
  if (e.target.name === "firstName" && e.target.value.trim() !== "") {
    if (!/^[A-Za-z]+/.test(e.target.value)) {
      errors.firstName = "enter a valid characters";
    } else if (e.target.value.length < 2) {
      errors.firstName = "sign 2 characters or more";
    } else if (e.target.value.length < 1 || e.target.value === "") {
      errors.firstName = null;
    } else if (e.target.value.length > 3) {
      errors.firstName = null;
    } else errors.firstName = null;
  }

  if (e.target.name === "lastName" && e.target.value.trim() !== "") {
    if (!/^[A-Za-z]+/.test(e.target.value)) {
      errors.firstName = "enter a valid characters";
    } else if (e.target.value.length < 2) {
      errors.firstName = "sign 2 characters or more";
    } else if (e.target.value.length < 1 || e.target.value === "") {
      errors.firstName = null;
    } else if (e.target.value.length > 3) {
      errors.firstName = null;
    } else errors.firstName = null;
  }

  // if (!inputValues.email) {
  //   errors.email = "email required";
  //   //   } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  // } else if (
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$ /i.test(inputValues.email)
  // ) {
  //   errors.email = "email value is incorrect";
  // }

  // if (!inputValues.password) {
  //   errors.password = "password is required";
  // } else if (inputValues.password.length < 6) {
  //   errors.password = "sign 6 characters or more";
  // }

  return errors;
}

//   if (!inputValues.lastName.trim()) {
//     errors.lastName = "lastName required";
//   }
