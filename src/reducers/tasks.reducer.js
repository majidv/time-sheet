import { GET_TASKS } from "../actions/tasks.actions";

const initialState = {
  tasksList: [],
};

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        tasksList: action.payload,
      };

    default:
      return state;
  }
}
