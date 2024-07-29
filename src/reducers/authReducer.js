import * as Actions from "../actions/types";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// sigup form input reducer
const initialSignupInputState = {
  profile: [],
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  checkBox: false,
};

const signinFormInputReducer = createReducerOrig(
  initialSignupInputState,
  (builder) => {
    builder
      .addCase(
        Actions.ADD_SIGNUP_FORM_INPUT,
        (state = initialSignupInputState, action) => {
          return { ...(action.payload || {}) };
        }
      )
      .addCase(Actions.UPDATE_SIGNUP_FORM_INPUT, (state, action) => {
        let obj = JSON.parse(JSON.stringify(state));
        obj[action.payload.propsName] = action.payload.value;
        return { ...obj };
      })
      .addCase(Actions.CLEAR_SIGNUP_FORM_INPUT, () => {
        const initialObjState = JSON.parse(
          JSON.stringify(initialSignupInputState)
        );
        return initialObjState;
      });
  }
);

// login form input reducer
const initialLoginInputState = {
  email: "",
  password: "",
};

const loginFormInputReducer = createReducerOrig(
  initialLoginInputState,
  (builder) => {
    builder
      .addCase(
        Actions.ADD_LOGIN_FORM_INPUT,
        (state = initialLoginInputState, action) => {
          return { ...(action.payload || {}) };
        }
      )
      .addCase(Actions.UPDATE_LOGIN_FORM_INPUT, (state, action) => {
        let obj = JSON.parse(JSON.stringify(state));
        obj[action.payload.propsName] = action.payload.value;
        return { ...obj };
      })
      .addCase(Actions.CLEAR_LOGIN_FORM_INPUT, () => {
        const initialObjState = JSON.parse(
          JSON.stringify(initialLoginInputState)
        );
        return initialObjState;
      });
  }
);

const authReducer = combineReducers({
  loginFormInput: loginFormInputReducer,
  signinFormInput: signinFormInputReducer,
});

export default authReducer;
