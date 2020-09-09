import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import jobsReducer from "./jobsReducer";
import likesReducer from "./likesReducer";

export default combineReducers({
  auth: AuthReducer,
  job: jobsReducer,
  likedJobs: likesReducer,
});
