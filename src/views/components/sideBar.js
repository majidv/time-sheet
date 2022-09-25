//** Sidebar Component */

//** React Imports */
import React from "react";

//** third party imports */
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import { List, UserPlus, Users } from "react-feather";

//** other imports */
import "../../assets/css/global.css";

const Sidebar = () => {
  const history = useHistory();
  const path = window.location.pathname;
  return (
    <>
      <Nav className="flex-column mt-3">
        <Nav.Link
          active={path === "/list-employees"}
          onClick={() => history.push("/list-employees")}
          className="d-flex align-items-center"
        >
          <Users size={14} />
          <span style={{ fontSize: 14 }}>&nbsp;List Employees</span>
        </Nav.Link>
        <Nav.Link
          active={path === "/add-employee"}
          onClick={() => history.push("/add-employee")}
          className="d-flex align-items-center"
        >
          <UserPlus size={14} />
          <span style={{ fontSize: 14 }}>&nbsp;Add Employee</span>
        </Nav.Link>
        <Nav.Link
          active={path === "/summary"}
          onClick={() => history.push("/summary")}
          className="d-flex align-items-center"
        >
          <List size={14} />
          <span style={{ fontSize: 14 }}>&nbsp;Summary</span>
        </Nav.Link>
      </Nav>
    </>
  );
};

export default Sidebar;
