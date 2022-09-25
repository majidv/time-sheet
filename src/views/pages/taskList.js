//** List Employees Page */

//** third party imports */
import { Col, Container, Row } from "react-bootstrap";

//** other imports */
import NavBar from "../components/navBar";
import "../../assets/css/global.css";
import Colors from "../../constants/colors.json";
import Table from "../components/taskList/table";
import Footer from "../components/footer";

const TaskList = () => {
  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      <Container fluid style={{ height: "88%" }}>
        <Row className="h-100" style={{ backgroundColor: Colors.white }}>
          <Col sm={12}>
            <Row className="mt-3">
              <Col>
                <Table />
              </Col>
            </Row>
          </Col>
        </Row>

        <Footer />
      </Container>
    </div>
  );
};

export default TaskList;
