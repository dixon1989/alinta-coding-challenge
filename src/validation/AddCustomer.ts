export const validateFirstName = (value: string): string | undefined => {
  let error;
  if (value === "") {
    error = "First Name cannot be Empty!";
  }
  return error;
};

export const validateLastName = (value: string): string | undefined => {
  let error;
  if (!value) {
    error = "Last Name cannot be Empty!";
  }
  return error;
};

export const validatePhone = (value: string): string | undefined => {
  let error;
  if (!value) {
    error = "Phone Number Field cannot be Empty!";
  } else if (
    !/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i.test(
      value
    )
  ) {
    error = "Invalid Australian Phone number";
  }
  return error;
};

export const validateDateOfBirth = (value: string): string | undefined => {
  let error;
  if (!value) {
    error = "Select your Date of Birth!";
  }
  return error;
};
