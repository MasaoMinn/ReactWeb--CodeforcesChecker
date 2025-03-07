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
        <Navbar.Brand href="">Codeforces Checker</Navbar.Brand><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-incognito" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205a1.032 1.032 0 0 0-.014-.058l-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5c-.62 0-1.411-.136-2.025-.267-.541-.115-1.093.2-1.239.735Zm.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a29.58 29.58 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274ZM3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Zm-1.5.5c0-.175.03-.344.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085c.055.156.085.325.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0v-1Zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5Z"/>
</svg>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
{/*             <Nav.Link href="#home">Home</Nav.Link>
               <Nav.Link href="#link">Link</Nav.Link>*/}
          </Nav>
          <Nav className='ms-auto'>
            <Button variant={`${theme}`} onClick={handleShow}>changeUser</Button>
          <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://github.com/MasaoMinn" target="_blank" title="https://github.com/MasaoMinn">About me</NavDropdown.Item>
              <NavDropdown.Item><ThemeButton /></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item title="https://github.com/MasaoMinn/React-Web--Codeforces-Checker" href="https://github.com/MasaoMinn/React-Web--Codeforces-Checker" target="_blank">See me on Github</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default BasicExample;