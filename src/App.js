import React from "react";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./routes/privateRoutes";
import PublicRoute from "./routes/publicRoutes";

import "./App.css";

import SignIn from "./views/pages/signIn";
import Dashboard from "./views/pages/dashboard";
import AddEmployee from "./views/pages/addEmployee";
import UserRoute from "./routes/userRoutes";
import TaskList from "./views/pages/taskList";
import Summary from "./views/pages/summary";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={true} component={SignIn} path="/login" exact />
        <PrivateRoute component={Dashboard} path="/list-employees" exact />
        <PrivateRoute component={AddEmployee} path="/add-employee" exact />
        <PrivateRoute component={Summary} path="/summary" exact />
        <UserRoute component={TaskList} path="/task-list" exact />
        <Redirect from="*" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
