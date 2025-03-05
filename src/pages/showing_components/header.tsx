import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTheme } from '../../components/themeProvider';
import ThemeButton from '../../components/themeButton';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useUserInfo } from '@/components/userProvider';
function BasicExample() {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = () => {
    //update 'handle' in userInfo
    setUserInfo(handle);
    handleClose();
  }
  const [handle, setHandle] = useState('');
  return (
    <>
      <Modal show={show} onHide={handleClose} data-bs-theme={theme} className={`bg-${theme}-subtle`}>
  <Modal.Header closeButton closeVariant={theme === 'dark' ? 'white' : undefined} className={`bg-${theme}`}>
    <Modal.Title className={`text-${theme === 'dark' ? 'light' : 'dark'}`}>Change CF Handle</Modal.Title>
  </Modal.Header>
  
  <Modal.Body className={`bg-${theme} text-${theme === 'dark' ? 'light' : 'dark'}`}>
    <Form>
    <Form.Group className="mb-3" controlId="input">
        <Form.Label>Input a new Codeforces Handle</Form.Label>
        <Form.Control type="text" placeholder="handle" autoFocus value={handle} onChange={(e) => setHandle(e.target.value)}/>
    </Form.Group>
    </Form>
  </Modal.Body>

  <Modal.Footer className={`bg-${theme}-subtle`}>
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleChange}>Save Changes</Button>
  </Modal.Footer>
</Modal>
    <Navbar expand="lg" bg={`${theme}`} data-bs-theme={`${theme}`}>
      <Container>
        <Navbar.Brand href="#">Codeforces Checker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
{/*             <Nav.Link href="#home">Home</Nav.Link>
               <Nav.Link href="#link">Link</Nav.Link>*/}
          </Nav>
          <Nav className='ms-auto'>
            <Button variant={`${theme}`} onClick={handleShow}>Contact</Button>
          <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="">About me</NavDropdown.Item>
              <NavDropdown.Item><ThemeButton /></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://github.com/MasaoMinn/React-Web--Codeforces-Checker">See me on Github</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default BasicExample;