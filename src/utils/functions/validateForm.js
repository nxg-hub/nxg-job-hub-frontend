export const validateForm = function (
  e,
  formData,
  setErrors,
  errors,
  sethasError
) {
  let hasError = false;
  e.preventDefault();
  // console.log(formData)
  console.log(errors);

  if (formData.password.length < 8) {
    setErrors({
      ...errors,
      password: "Password must be more than 8 characters",
    });
    hasError = Object.values(errors).some((err) => (!err ? false : true));
    sethasError(hasError);
  }  else {
    setErrors({ ...errors, password: "" });
    hasError = Object.values(errors).some((err) => (!err ? false : true));
    sethasError(hasError);
  }
  console.log(Object.values(errors));
};
