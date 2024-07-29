import * as Actions from "../actions/types";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

//add product input reducer
const initialState = {
  profile: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const profileInputReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.SET_PROFILE_INPUT, (state = initialState, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_PROFILE_INPUT, (state, action) => {
      let obj = JSON.parse(JSON.stringify(state));
      obj[action.payload.propsName] = action.payload.value;
      return { ...obj };
    })
    .addCase(Actions.CLEAR_PROFILE_INPUT, () => {
      const initialObjState = JSON.parse(JSON.stringify(initialState));
      return initialObjState;
    });
});

const profileReducer = combineReducers({
  profileInput: profileInputReducer,
});

export default profileReducer;
