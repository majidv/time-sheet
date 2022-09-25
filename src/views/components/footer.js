//** third party imports */
import { Row } from "react-bootstrap";

//** other imports */
import Colors from "../../constants/colors.json";

const Footer = () => {
  return (
    <Row style={{ backgroundColor: Colors.grey }}>
      <span
        className="d-flex align-items-center justify-content-center mt-1"
        style={{ color: Colors.dark_blue, fontSize: "0.8em" }}
      >
        Test v2022
      </span>
    </Row>
  );
};

export default Footer;
