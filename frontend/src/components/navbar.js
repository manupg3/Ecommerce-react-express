import  Nav  from "react-bootstrap/Nav"
import  Navbar  from "react-bootstrap/Navbar"
import  NavDropdown  from "react-bootstrap/NavDropdown"
import  Form  from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import React,{useState} from 'react'
import Container from "react-bootstrap/Container"
import { LinkContainer } from 'react-router-bootstrap'
import '../assets/css/navbarstyles.css'
import  Offcanvas  from "react-bootstrap/Offcanvas"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee,faSearch } from '@fortawesome/free-solid-svg-icons'



export default function Header(){
    const [show, setShow] = useState(false);

    const handleCloseSearch = () => setShow(false);
    const handleShow = () => setShow(true);
    const [close, setClose] = useState(false);
    const closeNav = () => setClose(true);
  
    const handleClose = e =>{
    
      console.log("E TARGET", );
      
    }
  
    return(
<Navbar bg="light" expand="lg" className="bg-white shadow-md p-12 navbar-custom" >
  <Container fluid>
    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <LinkContainer to="/">
        <Nav.Link >Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/store">
        <Nav.Link >Store</Nav.Link>
        </LinkContainer>
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <LinkContainer to="/contact">
        <Nav.Link  >
          Contact
        </Nav.Link>
        </LinkContainer>
      </Nav>
      <button className="bg-white text-black semibold border-0 focus:shadow-none" onClick={handleShow}>
      <FontAwesomeIcon  icon={faSearch} />
            </button>

      <Offcanvas show={show} placement='top' className="offcanvas-search" onHide={handleCloseSearch}>
        <Offcanvas.Header closeButton className="pb-0">
          <Offcanvas.Title className="ml-auto mr-auto pt-8 ">Search products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form className="d-flex w-[60%] ml-auto mr-auto mt-2">
        <FormControl
          type="search"
          placeholder="Search"
          className=""
          aria-label="Search"
        />
         <button className="bg-tansparent text-black semibold border-b-[1px] border-gray-300 focus:shadow-none">
      <FontAwesomeIcon  icon={faSearch} />
            </button>
      </Form>
        </Offcanvas.Body>
      </Offcanvas>
  
    </Navbar.Collapse>
  </Container>
</Navbar>

)
}