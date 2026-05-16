import validator from "validator";

function dataValidation(email, password) {

    
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