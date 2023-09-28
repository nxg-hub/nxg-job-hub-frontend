export const validateForm = function (e, formData, setErrors, errors) {
  let hasError = false;
  e.preventDefault();

  

  // if (formData.phone.length < 9) {
  //   setErrors({ ...errors, phone: "Invalid phone number" });
  //   hasError = true;
  // } else {
  //   setErrors({ ...errors, phone: "" });
  //   hasError = false;
  //   console.log(errors.phone);
  // }
  // if (formData.password.length < 8) {
  //   setErrors({
  //     ...errors,
  //     password: "Password must have at least 8 characters",
  //   });
  //   hasError = true;
  // } else {
  //   setErrors({ ...errors, password: "" });
  //   hasError = false;
  // }

  console.log(errors);
};
