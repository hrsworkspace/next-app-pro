import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  profile: profileReducer,
});
