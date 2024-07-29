import { toast } from "react-toastify";

/**
 * @desc Checks if given value is Email
 * @param {*} value // Accepts string
 */
export const isEmail = (value) => {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(value);
};

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value) {
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

export const NOTIFICATION = {
  ERROR: 0,
  SUCCESS: 1,
  INFO: 2,
  WARN: 3,
};

/**
 * @desc tostify - notification popup
 * @param {*}
 */
export const tostify = (type, value) => {
  if (type === NOTIFICATION.ERROR) {
    return toast.error(value);
  } else if (type === NOTIFICATION.SUCCESS) {
    return toast.success(value);
  } else if (type === NOTIFICATION.INFO) {
    return toast.info(value);
  } else if (type === NOTIFICATION.WARN) {
    return toast.warn(value);
  } else {
    return toast(value);
  }
};

//antd Image file to gase64
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
