import { createReducer } from "@/helper/reduxHelper";
import * as Actions from "../actions/types";
import { createReducer as createReducerOrig } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

//add product input reducer
const initialState = {
  id: "",
  image: [],
  productName: "",
  category: "",
  price: "",
  cart: 0,
};

const addItemInputReducer = createReducerOrig(initialState, (builder) => {
  builder
    .addCase(Actions.ADD_ITEM_INPUT, (state = initialState, action) => {
      return { ...(action.payload || {}) };
    })
    .addCase(Actions.UPDATE_ITEM_INPUT, (state, action) => {
      let obj = JSON.parse(JSON.stringify(state));
      obj[action.payload.propsName] = action.payload.value;
      return { ...obj };
    })
    .addCase(Actions.CLEAR_ITEM_INPUT, () => {
      const initialObjState = JSON.parse(JSON.stringify(initialState));
      return initialObjState;
    });
});

const productListReducer = createReducer({
  initialState: [],
  actionType: Actions.SET_PRODUCT_LIST,
});

const productReducer = combineReducers({
  addItemInput: addItemInputReducer,
  productList: productListReducer,
});

export default productReducer;
