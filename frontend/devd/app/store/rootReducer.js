import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import pageReducer from "./slices/pageSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  task: taskReducer,
  page: pageReducer,
});

export default rootReducer;
