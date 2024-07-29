import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

export const addLoginFormInputAction = createAction(
  Actions.ADD_LOGIN_FORM_INPUT
);
export const updateLoginFormInputAction = createAction(
  Actions.UPDATE_LOGIN_FORM_INPUT
);
export const clearLoginFormInputAction = createAction(
  Actions.CLEAR_LOGIN_FORM_INPUT
);
export const addSignupFormInputAction = createAction(
  Actions.ADD_SIGNUP_FORM_INPUT
);
export const updateSignupFormInputAction = createAction(
  Actions.UPDATE_SIGNUP_FORM_INPUT
);
export const clearSignupFormInputAction = createAction(
  Actions.CLEAR_SIGNUP_FORM_INPUT
);
