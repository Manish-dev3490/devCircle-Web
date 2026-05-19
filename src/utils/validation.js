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


export function validateData(firstName, lastName, age, photo) {

    // First Name
    if (firstName.length < 3 || firstName.length > 50) {

        const error = new Error(
            "First name must be between 3 and 50 characters"
        );

        error.field = "firstName";

        throw error;
    }

    // Last Name
    if (lastName.length < 3 || lastName.length > 50) {

        const error = new Error(
            "Last name must be between 3 and 50 characters"
        );

        error.field = "lastName";

        throw error;
    }

    // Age
    if (age < 18 || age > 80) {

        const error = new Error(
            "Age must be between 18 and 80"
        );

        error.field = "age";

        throw error;
    }

    // Photo URL
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;

    if (!urlPattern.test(photo)) {

        const error = new Error(
            "Please enter a valid image URL"
        );

        error.field = "photo";

        throw error;
    }

    return true;
}
export default dataValidation;