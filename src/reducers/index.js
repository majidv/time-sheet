import { combineReducers } from "redux";
import { employeesReducer } from "./employees.reducer";
import { tasksReducer } from "./tasks.reducer";
export default combineReducers({
  employeesReducer,
  tasksReducer,
});
