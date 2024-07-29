import { createAction } from "@reduxjs/toolkit";
import * as Actions from "./types";

export const addItemInputAction = createAction(Actions.ADD_ITEM_INPUT);
export const updateItemInputAction = createAction(Actions.UPDATE_ITEM_INPUT);
export const clearItemInputAction = createAction(Actions.CLEAR_ITEM_INPUT);

export const setProductList = createAction(Actions.SET_PRODUCT_LIST);
