//** Sign In Page */

//** React imports */
import { useState } from "react";

//** third party imports */
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { Lock, User } from "react-feather";

//** other imports */
import NavBar from "../components/navBar";
import "../../assets/css/global.css";
import { login } from "../../services";
import Footer from "../components/footer";
import Colors from "../../constants/colors.json";
import { toast } from "react-toastify";

const SignIn = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const toDashboard = () => {
    history.push("/list-employees");
  };

  const toTaskList = () => {
    history.push("/task-list");
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username !== "" && credentials.password !== "") {
      const data = {
        username: credentials.username,
        password: credentials.password,
      };
      const res = login(data);
      if (res === "failed") {
        toast.error("Login Failed");
      } else if (res === "admin") {
        toDashboard();
      } else {
        toTaskList();
      }
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      <Container
        style={{ backgroundColor: Colors.white }}
        fluid
        className="h-75"
      >
        <Row className="h-100">
          <Col sm={12}>
            <Row className="h-100 align-items-center justify-content-center">
              <Col
                sm={4}
                className="d-flex align-items-center justify-content-center"
              >
                <Form onSubmit={(e) => handleLogin(e)}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>
                      <User size={16} />
                      Username
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      type="username"
                      placeholder="Enter Username"
                    />
                    <Form.Text className="text-muted">
                      Use "admin" as Username for testing
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>
                      <Lock size={16} />
                      Password
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => handleChange(e)}
                      type="password"
                      placeholder="Password"
                    />
                    <Form.Text className="text-muted">
                      Use "password" as Password for testing
                    </Form.Text>
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default SignIn;
