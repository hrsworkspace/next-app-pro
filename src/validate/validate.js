import {
  NOTIFICATION,
  isEmail,
  isEmpty,
  isNumber,
  tostify,
} from "@/helper/helper";

/**
 * Sign In Form validation
 */
export const signinFormValidation = (signinFormInput) => {
  if (isEmpty(signinFormInput?.firstName)) {
    return tostify(NOTIFICATION.ERROR, "Please enter first name!");
  } else if (isNumber(signinFormInput?.firstName)) {
    return tostify(NOTIFICATION.ERROR, "Please enter valid first name!");
  } else if (isEmpty(signinFormInput?.lastName)) {
    return tostify(NOTIFICATION.ERROR, "Please enter last name!");
  } else if (isNumber(signinFormInput?.lastName)) {
    return tostify(NOTIFICATION.ERROR, "Please enter valid last name!");
  } else if (isEmpty(signinFormInput?.phone)) {
    return tostify(NOTIFICATION.ERROR, "Please enter phone!");
  } else if (isEmpty(signinFormInput?.email)) {
    return tostify(NOTIFICATION.ERROR, "Please enter email!");
  } else if (!isEmail(signinFormInput?.email)) {
    return tostify(NOTIFICATION.ERROR, "Please enter valid email!");
  } else if (isEmpty(signinFormInput?.password)) {
    return tostify(NOTIFICATION.ERROR, "Please enter password!");
  } else if (isEmpty(signinFormInput?.confirmPassword)) {
    return tostify(NOTIFICATION.ERROR, "Please enter confirm password!");
  } else if (
    !isEmpty(signinFormInput?.password) &&
    !isEmpty(signinFormInput?.confirmPassword) &&
    signinFormInput?.password !== signinFormInput?.confirmPassword
  ) {
    return tostify(
      NOTIFICATION.ERROR,
      "Password and confirm password must be same!"
    );
  } else if (!signinFormInput?.checkBox) {
    return tostify(NOTIFICATION.ERROR, "Please fill check box!");
  } else if (isEmpty(signinFormInput?.profile)) {
    return tostify(NOTIFICATION.ERROR, "Please upload profile!");
  }
};

/**
 * Login Form validation
 */
export const loginFormValidation = (loginFormInput) => {
  if (isEmpty(loginFormInput?.email)) {
    return tostify(NOTIFICATION.ERROR, "Please Enter Email!");
  } else if (isEmpty(loginFormInput?.password)) {
    return tostify(NOTIFICATION.ERROR, "Please Enter Password!");
  }
};

/**
 * Add item form validation
 */
export const addItemFormvalidation = (addItemInput) => {
  if (isEmpty(addItemInput?.productName)) {
    return tostify(NOTIFICATION.ERROR, "Please enter product name!");
  } else if (isEmpty(addItemInput?.category)) {
    return tostify(NOTIFICATION.ERROR, "Please enter category!");
  } else if (isEmpty(addItemInput?.price)) {
    return tostify(NOTIFICATION.ERROR, "Please enter price!");
  } else if (isEmpty(addItemInput?.image)) {
    return tostify(NOTIFICATION.ERROR, "Please upload image!");
  }
};

/**
 * Validate firebase authentication
 */
export const validFirebaseErrorMessage = (e) => {
  if (!e) return;
  let code = "";
  if (e.code) {
    code = JSON.parse(JSON.stringify(e.code));
  }
  let message = "";
  switch (code) {
    case "auth/invalid-phone-number":
      message = "Please enter a valid number";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/invalid-verification-code":
      message = "Invalid verification code";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/too-many-requests":
      message = "You have attempt too many rerequests. Please try again later.";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/invalid-email":
      message = "Please enter a valid email";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/user-not-found":
      message = "Please enter valid email or password";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/wrong-password":
      message = "Please enter valid email or password";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/email-already-in-use":
      message = "That email address is already in use!";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/invalid-login-credentials":
      message = "Please enter valid email or password";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/missing-email":
      message = "Please enter Email";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/invalid-action-code":
      message = "Reset password link is expire. please try again!";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/weak-password":
      message = "Weak password!";
      tostify(NOTIFICATION.ERROR, message);
      break;
    case "auth/invalid-credential":
      message = "Please Enter valid Email or Password!";
      tostify(NOTIFICATION.ERROR, message);
      break;
    default:
      message = JSON.stringify(e.message);
      tostify(NOTIFICATION.ERROR, message);
      break;
  }
  return message;
};
