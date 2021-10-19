import React, { Component } from "react";
import { Card, Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const token = `1963096965:AAF3MwzCNUomDFC3pRgS7f6mSUkuxHpqLeM`;

class bascket extends Component {
  state = {
    l: [],
    show: false,
    name:"",
    number:"",
    checkbox:[],
  };

  componentDidMount() {
     axios.get(`https://api.telegram.org/bot${token}/getUpdates`).then((fx) => {
       console.log(fx);
     });
         
    this.setState({
      l: JSON.parse(localStorage.getItem("local")) || [],
    });
  }

  addBascket = (s) => {
    this.setState((d) => {
      return { l: d.l.filter((f) => f.idMeal !== s.idMeal) };
    });
    localStorage.clear();
  }
  todo = () => {
    this.setState({ show: !this.state.show });
  }
Sha = () => {
  axios.get(`https://api.telegram.org/bot${token}/sendMessage`,{
        params:{
            parse_mode: "Html",
            const_id : "770524168",
            text: `<b>${this.state.number}</b><i>${this.state.name}</i><i>${this.state.adress}</i>`

        }}  
)}
// closes = ()=>{
//   this.setState({
//     number: "",
//     name:"",
      
//   })
// }

  render() {
      console.log(this.state.checkbox)
    return (
      <>
        <div className="d-flex justify-content-between m-4 ">
          <h3>bascket ({this.state.l.length})</h3>

          <Button
            className="me-2"
            onClick={() => {
              this.todo();
            }}
          >
            Order
          </Button>
        </div>

        <Container className="d-flex justify-content-around flex-wrap">
          {this.state.l.map((s) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={s.strMealThumb} />
                <Card.Body>
                  <Card.Title as={Link} to={`/info/${s.idMeal}`}>
                    {s.strMeal}
                  </Card.Title>
                  <Card.Text></Card.Text>
                  <Button
                    onClick={() => {
                      this.addBascket(s);
                    }}
                    variant={
                      this.state.l.find((r) => r.idMeal === s.idMeal)
                        ? "danger"
                        : "primary"
                    }
                  >
                    {this.state.l.find((r) => r.idMeal === s.idMeal)
                      ? "удалить корзину"
                      : " добавить в корзину"}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>

        <Modal
          show={this.state.show}
          onHide={() => {
            this.todo();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="fromBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                  type="text"
                  value={this.state.name}
                  placeholder="SurName"
                ></Form.Control>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="fromBasicNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    this.setState({ number: e.target.value });
                  }}
                  type="text"
                  value={this.state.number}
                  placeholder="PhoneNumber"
                ></Form.Control>
              </Form.Group>
                {this.state.l.map((s) => {
              return (
                <Form.Group className="mt-2" controlId="formBasicCheckbox" >
                  <Form.Check onChange={(e)=>{
                    this.setState((p)=>{
                      const a = e.target.checked? [...p.checkbox, s]: this.state.checkbox.filter((f) => f.idMeal !== s.idMeal);
                      return {checkbox: a}
                    })
                  }} type="checkbox" label={s.strMeal} />
                </Form.Group>
              );})}
              <hr />
              <Form.Group className="mt-2" controlId="formBasicCheckbox">

                <Form.Check type="checkbox" label="kefwfw" />
              </Form.Group>

              <div className="d-flex justify-content-end  ">
                    <Button className="me-2" onClick={() => { 
                      this.closes()                                   
                    }}>
                      Close
                    </Button>
                <Button
                  onClick={() => {
                    this.Sha();
                  }}
                >
                  Send this
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default bascket;
