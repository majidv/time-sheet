import Credentials from "../constants/credentials.json";

//** Check wheather Login or Not */
export const isUser = () => {
  if (
    localStorage.getItem("access") &&
    localStorage.getItem("access") !== "admin"
  ) {
    return true;
  }

  return false;
};
export const isAdmin = () => {
  if (localStorage.getItem("access") === "admin") {
    return true;
  }

  return false;
};

//** Logout User */
export const logout = () => {
  localStorage.removeItem("access");
  return true;
};

//** Login User */
export const login = (data) => {
  if (data.username === Credentials.username) {
    if (data.password === Credentials.password) {
      localStorage.setItem("access", Credentials.username);
      return "admin";
    } else {
      return "failed";
    }
  } else {
    const employees = localStorage.getItem("employees") ?? "";
    const employeesJson = employees && JSON.parse(employees);
    const employee =
      employeesJson &&
      employeesJson?.find(
        (item) =>
          item.email === data.username && item.passWord === data.password
      );
    if (employee) {
      localStorage.setItem("access", employee.email);
      return employee.name;
    }
    return "failed";
  }
};
