//** List Employees Page */


//** third party imports */
import { Col, Container, Row } from "react-bootstrap"

//** other imports */
import NavBar from "../components/navBar"
import Sidebar from "../components/sideBar"
import '../../assets/css/global.css'
import Colors from "../../constants/colors.json"
import Table from "../components/dashboard/table"
import Footer from "../components/footer"

const Dashboard = () => {
    return (
        <div style={{ height: '100vh' }}>
            <NavBar />
            <Container fluid style={{ height: "88%" }}>
                <Row className="h-100" style={{ backgroundColor: Colors.white }}>
                    <Col style={{ backgroundColor: Colors.light_green }} className="d-none d-sm-block" sm={2}>
                        <Sidebar />
                    </Col>
                    <Col sm={10}>
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
    )
}

export default Dashboard