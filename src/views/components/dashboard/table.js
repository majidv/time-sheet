//** React Imports */
import { Fragment, useEffect, useState } from "react";

//** Third party Imports */
import DataTable from "react-data-table-component";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import {
  Edit,
  Lock,
  Mail,
  Smartphone,
  ToggleLeft,
  Trash2,
  User,
} from "react-feather";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

//** Other Imports */
import {
  deleteEmployee,
  editEmployee,
  getEmployees,
} from "../../../actions/employees.actions";

const Table = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const { employeesList } = useSelector(
    (state) => ({
      employeesList: state.employeesReducer.employeesList,
    }),
    shallowEqual
  );

  const [details, setDetails] = useState({
    name: "",
    contact: "",
    email: "",
    gender: "",
    passWord: "",
  });

  //** to show and hide edit modal */
  const [modalShow, setModalShow] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const modShow = (id) => {
    setEditIndex(id);
    setModalShow(true);
    const filteredItem = employeesList.filter((item) => item.id === id);
    setDetails(filteredItem[0]);
  };
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.id]: e.target.value,
    });
  };

  const deleteEmp = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (details.name !== "" && details.contact !== "") {
      const data = {
        name: details.name,
        contact: details.contact,
        email: details.email,
        gender: details.gender,
        passWord: details.passWord,
      };
      dispatch(editEmployee(data, editIndex));
      setModalShow(false);
    }
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: false,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: false,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => row.passWord,
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div>
          <Button onClick={() => modShow(row.id)} variant="warning" size="sm">
            <Edit size={16} />
          </Button>{" "}
          <Button onClick={() => deleteEmp(row.id)} variant="danger" size="sm">
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="d-flex h-100 align-items-center justify-content-center"
            onSubmit={(e) => handleEdit(e)}
          >
            <Row className="align-items-center justify-content-center">
              <Col sm={5}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>
                    <User size={16} />
                    &nbsp;Name
                  </Form.Label>
                  <Form.Control
                    required
                    value={details.name}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Enter Name"
                  />
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group className="mb-3" controlId="contact">
                  <Form.Label>
                    <Smartphone size={16} />
                    &nbsp;Contact
                  </Form.Label>
                  <Form.Control
                    required
                    value={details.contact}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Contact"
                  />
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    <Mail size={16} />
                    &nbsp;Email
                  </Form.Label>
                  <Form.Control
                    value={details.email}
                    onChange={(e) => handleChange(e)}
                    type="email"
                    placeholder="Email"
                  />
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>
                    <ToggleLeft size={16} />
                    &nbsp;Gender
                  </Form.Label>
                  <Form.Select
                    value={details.gender}
                    onChange={(e) => handleChange(e)}
                    aria-label="Gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={5}>
                <Form.Group className="mb-3" controlId="passWord">
                  <Form.Label>
                    <Lock size={16} />
                    &nbsp;Password
                  </Form.Label>
                  <Form.Control
                    value={details.passWord}
                    onChange={(e) => handleChange(e)}
                    type="passWord"
                    placeholder="Password"
                  />
                </Form.Group>
              </Col>
              <Col
                sm={3}
                className="d-flex align-items-center justify-content-start mt-3"
              >
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Col>
              <Col
                sm={2}
                className="d-flex align-items-center justify-content-end mt-3"
              >
                <Button variant="danger" onClick={() => setModalShow(false)}>
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Fragment>
        <Card>
          <DataTable
            noHeader
            subHeader
            responsive
            columns={columns}
            data={employeesList}
            className="react-dataTable"
            subHeaderAlign="left"
            subHeaderWrap
            subHeaderComponent={<h3>Employees List</h3>}
          />
        </Card>
      </Fragment>
    </>
  );
};

export default Table;
