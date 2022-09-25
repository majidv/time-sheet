//** Add Employee Page */

//** React imports */
import { useState } from "react";

//** third party imports */
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Lock, Mail, Smartphone, ToggleLeft, User } from "react-feather";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

//** other imports */
import NavBar from "../components/navBar";
import Sidebar from "../components/sideBar";
import "../../assets/css/global.css";
import Colors from "../../constants/colors.json";
import { addEmployee } from "../../actions/employees.actions";
import Footer from "../components/footer";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [details, setdetails] = useState({
    name: "",
    contact: "",
    email: "",
    gender: "male",
    passWord: "123456",
  });

  const toDashboard = () => {
    history.push("/list-employees");
  };

  const handleChange = (e) => {
    setdetails({
      ...details,
      [e.target.id]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (details.contact !== "" && details.email !== "") {
      const data = {
        id: Date.now(),
        name: details.name,
        contact: details.contact,
        email: details.email,
        gender: details.gender,
        passWord: details.passWord,
      };
      dispatch(addEmployee(data));
      toDashboard();
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      <Container fluid style={{ height: "88%" }}>
        <Row className="h-100" style={{ backgroundColor: Colors.white }}>
          <Col
            style={{ backgroundColor: Colors.light_green }}
            className="d-none d-sm-block"
            sm={2}
          >
            <Sidebar />
          </Col>
          <Col sm={10}>
            <Form
              className="d-flex h-100 align-items-center justify-content-center"
              onSubmit={(e) => handleAdd(e)}
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
                  sm={5}
                  className="d-flex align-items-center justify-content-start mt-3"
                >
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default AddEmployee;
