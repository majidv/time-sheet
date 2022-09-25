//** Navbar Component */

//** third party imports */
import { Container, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router";
import { LogOut } from "react-feather";

//** other imports */
import { isAdmin, isUser, logout } from "../../services";
import Colors from "../../constants/colors.json";

const NavBar = () => {
  const history = useHistory();
  const signOut = () => {
    const res = logout();
    if (res) {
      history.push("/login");
    }
  };
  return (
    <Navbar style={{ backgroundColor: Colors.grey }} expand="md">
      <Container>
        <Navbar.Brand style={{ color: Colors.dark_blue }} href="/dashboard">
          Test
        </Navbar.Brand>
        {(isAdmin() || isUser()) && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="align-items-center justify-content-end"
            >
              <h6 style={{ color: Colors.dark_green }} className="m-0">
                Hi {localStorage.getItem("access")}
              </h6>
              <Nav>
                <Nav.Link onClick={() => signOut()}>
                  <LogOut size={16} />
                  &nbsp;Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
