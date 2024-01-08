export default function validateForm(e) {
  let errors = {};
  //   console.log("target name in validate", e.target.name);

  if (e.target.name === "firstName" && e.target.value.trim() !== "") {
    // console.log("target name in si firstName");
    if (!/^[A-Za-z]+/.test(e.target.value)) {
      errors.firstName = "enter a valid characters";
    } else if (e.target.value.length < 2) {
      errors.firstName = "sign min 2 chars";
    } else if (e.target.value.length < 1 || e.target.value === "") {
      errors.firstName = "";
    } else if (e.target.value.length > 1) {
      errors.firstName = "";
    } else errors.firstName = "";
  } else if (e.target.name === "firstName" && e.target.value.trim() === "") {
    errors.firstName = "";
  }

  if (e.target.name === "lastName" && e.target.value.trim() !== "") {
    // console.log("target name in si lastName");
    if (!/^[A-Za-z]+/.test(e.target.value)) {
      errors.lastName = "enter a valid characters";
    } else if (e.target.value.length < 2) {
      errors.lastName = "sign min 2 chars";
    } else if (e.target.value.length < 1 || e.target.value === "") {
      errors.lastName = "";
    } else if (e.target.value.length > 3) {
      errors.lastName = "";
    } else errors.lastName = "";
  } else if (e.target.name === "lastName" && e.target.value.trim() === "") {
    errors.lastName = "";
  }

  if (e.target.name === "email" && e.target.value.trim() !== "") {
    console.log("target name is email");
    const regex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]){1,}?$/;
    if (!regex.test(e.target.value)) {
      errors.email = "sign valid email";
    } else {
      errors.email = "";
    }
  } else if (e.target.name === "email" && e.target.value.trim() === "") {
    errors.email = "";
  }
  if (e.target.name === "password" && e.target.value.trim() !== "") {
    // console.log("target name in si firstName");
    if (!/^[A-Za-z]+/.test(e.target.value)) {
      errors.password = "enter a valid characters";
    } else if (e.target.value.length < 6) {
      errors.password = "sign min 6 chars";
    } else if (e.target.value.length < 1 || e.target.value === "") {
      errors.password = "";
    } else if (e.target.value.length > 1) {
      errors.password = "";
    } else errors.password = "";
  } else if (e.target.name === "password" && e.target.value.trim() === "") {
    errors.password = "";
  }

  // if (!inputValues.password) {
  //   errors.password = "password is required";
  // } else if (inputValues.password.length < 6) {
  //   errors.password = "sign 6 characters or more";
  // }

  return errors;
}
