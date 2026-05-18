import validator from "validator";

function dataValidation(email, password) {

  if (email.length === 0 ) throw {
    field: "email",
    message: "your email input is empty"
  };

  if (password.length === 0) throw {
    field: "password",
    message: "your password input is empty"
  };
  if (!validator.isEmail(email)) {

    throw {
      field: "email",
      message: "Your email is not valid"
    };
  }

  if (!validator.isStrongPassword(password)) {

    throw {
      field: "password",
      message: "Please enter a strong password"
    };
  }

  return null;
}

export default dataValidation;