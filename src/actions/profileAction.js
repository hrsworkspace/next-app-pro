import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

export const setProfileInputAction = createAction(Actions.SET_PROFILE_INPUT);
export const updateProfileInputAction = createAction(
  Actions.UPDATE_PROFILE_INPUT
);
export const clearProfileInputAction = createAction(
  Actions.CLEAR_PROFILE_INPUT
);
