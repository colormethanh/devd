import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer;
