import { isAdmin } from "../services";

export const GET_TASKS = "GET_TASKS";

//** Get Tasks List From Local Storage */
export const getTasks = () => async (dispatch) => {
  try {
    const res = localStorage.getItem("tasks");
    const ress = JSON.parse(res);
    const userRess = isAdmin()
      ? ress
      : ress?.filter((item) => item.email === localStorage.getItem("access"));
    if (userRess) {
      dispatch({
        type: GET_TASKS,
        payload: userRess,
      });
    }
  } catch (error) {}
};

///** Add Task to Storage */
export const addTask = (data) => async (dispatch) => {
  try {
    let ar = [];
    const existingAr = localStorage.getItem("tasks");
    if (existingAr !== null) {
      let existingArr = JSON.parse(existingAr);
      ar = [...existingArr];
    }
    ar.push({ ...data, email: localStorage.getItem("access") });
    let arr = JSON.stringify(ar);
    localStorage.setItem("tasks", arr);
    dispatch(getTasks());
  } catch (error) {}
};

//** Delete a Task */
export const deleteTask = (id) => async (dispatch) => {
  try {
    let ar = [];
    let concatUserNonUser = [];
    const existingAr = localStorage.getItem("tasks");
    if (existingAr !== null) {
      let existingArr = JSON.parse(existingAr);
      const nonUserexistingArr = existingArr?.filter(
        (item) => item.email !== localStorage.getItem("access")
      );
      const userexistingArr = existingArr?.filter(
        (item) => item.email === localStorage.getItem("access")
      );
      ar = [...userexistingArr].filter((data) => data.id !== id);
      concatUserNonUser = [...ar, ...nonUserexistingArr];
    }
    let arr = JSON.stringify(concatUserNonUser);
    localStorage.setItem("tasks", arr);
    dispatch(getTasks());
  } catch (error) {}
};

//** Edit a Task */
export const editTask = (data, id) => async (dispatch) => {
  try {
    let ar = [];
    let concatUserNonUser = [];
    const existingAr = localStorage.getItem("tasks");
    if (existingAr !== null) {
      let existingArr = JSON.parse(existingAr);
      const nonUserexistingArr = existingArr?.filter(
        (item) => item.email !== localStorage.getItem("access")
      );
      const userexistingArr = existingArr?.filter(
        (item) => item.email === localStorage.getItem("access")
      );
      ar = [...userexistingArr];
      const index = ar.findIndex((item) => item.id === id);
      ar[index] = { ...data, email: localStorage.getItem("access") };
      concatUserNonUser = [...ar, ...nonUserexistingArr];
    }
    let arr = JSON.stringify(concatUserNonUser);
    localStorage.setItem("tasks", arr);
    dispatch(getTasks());
  } catch (error) {}
};
