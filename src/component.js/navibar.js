import React, { Component } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  FormControl,
  Form,
  Button,
  NavLink,
} from "react-bootstrap";
import "react-bootstrap";
import {Link} from "react-router-dom"
import axi from "axios"

class navibar extends Component {
  state = {
    country: [],
    text: "",
    searchProducts: [],
    text2:"",
  };
  componentDidMount() {
    axi
      .get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      .then((res) => {
        console.log(res);
        this.setState({ country: res.data.meals });
      });
  }


  render() {
    return (
      <>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#" as={Link} to={"/"}>
              {" "}
              Osh Food
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="#action1" as={Link} to={"/"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/bascket">Bascket</Nav.Link>
                <NavLink href="/bot"> bot</NavLink>
                <NavDropdown title="Contries" id="navbarScrollingDropdown">
                  {this.state.country.map((c) => {

                    return (
                      <NavDropdown.Item
                        href="#action4"
                        as={Link}
                        to={`/items/${c.strArea}`}
                        // value={c.strArea}
                      >
                        {c.strArea}
                        {console.log(c.strArea)}
                      </NavDropdown.Item>
                    );
                  })}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5"></NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  onChange={(e)=>{
                    this.setState({text2: e.target.value})
                  }}
                
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button
                  as={Link}
                  to={`/search/${this.state.text2}`}
                  variant="outline-success"
                >
                  Searchbtn
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default navibar;



