import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import pageReducer from "./slices/pageSlice";
import componentReducer from "./slices/componentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  task: taskReducer,
  page: pageReducer,
  component: componentReducer,
});

export default rootReducer;
