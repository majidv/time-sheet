
import {
    GET_EMPLOYEES
} from '../actions/employees.actions';

const initialState = {
    employeesList: []
}

export function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                employeesList: action.payload,
            };

        default:
            return state
    }
}