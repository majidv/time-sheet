export const GET_EMPLOYEES = "GET_EMPLOYEES";

//** Get Employees List From Local Storage */
export const getEmployees = () => async (dispatch) => {
  try {
    const res = localStorage.getItem("employees");
    const ress = JSON.parse(res);
    if (res) {
      dispatch({
        type: GET_EMPLOYEES,
        payload: ress,
      });
    }
  } catch (error) {}
};

///** Add Employee to Storage */
export const addEmployee = (data) => async (dispatch) => {
  try {
    let ar = [];
    const existingAr = localStorage.getItem("employees");
    if (existingAr !== null) {
      let existingArr = JSON.parse(existingAr);
      ar = [...existingArr];
    }
    ar.push(data);
    let arr = JSON.stringify(ar);
    const res = localStorage.setItem("employees", arr);
    if (res) {
      dispatch(getEmployees());
    }
  } catch (error) {}
};

//** Delete an Employee */
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    let ar = [];
    const existingAr = localStorage.getItem("employees");
    if (existingAr !== null) {
      let existingArr = JSON.parse(existingAr);
      ar = [...existingArr].filter((data) => data.id !== id);
    }
    let arr = JSON.stringify(ar);
    localStorage.setItem("employees", arr);
    dispatch(getEmployees());
  } catch (error) {}
};

//** Edit an Employee */
export const editEmployee = (data, id) => async (dispatch) => {
  try {
    let ar = [];
    const existingAr = localStorage.getItem("employees");
    if (existingAr !== null) {
      let existingArr = JSON.parse(existingAr);
      ar = [...existingArr];
      const index = ar.findIndex((item) => item.id === id);
      ar[index] = data;
    }
    let arr = JSON.stringify(ar);
    localStorage.setItem("employees", arr);
    dispatch(getEmployees());
  } catch (error) {}
};
