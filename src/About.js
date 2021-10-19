import React, { Component } from 'react';
import { Card, Button, Container, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import ss from "./About.module.css"



class About extends Component {
  state = {
    cl: [],
    lan: true,
    bascket: [],
  };

  componentDidMount() {
    this.setState({ lan: true });
    const a = this.props.match.params.title;
    const x = axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${a}`,
    );
    x.then((response) => {
      console.log(response);
      this.setState({ cl: response.data.meals });
    })
      .catch((err) => console.log(err))
      .finally(() => {
        this.setState({ lan: false });
      });
  }

    componentDidUpdate(prevProps, prevState) {
    if (prevState.bascket !== this.state.bascket) {
      localStorage.setItem("local", JSON.stringify(this.state.bascket));
    }
  }
  addBascket = (s) => {
    this.setState((p) => {
      if (this.state.bascket.find(v => v.idMeal === s.idMeal)) {
        return {bascket: this.state.bascket.filter(r => r.idMeal !== s.idMeal)}
      } else {
        const a = [...p.bascket, s];
        return {bascket: a,
        };
      }
    });
  };  
  render() {
    return (
      <>
        {this.state.lan ? (
          <div className={ss.spin}>
            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
          </div>
        ) : null}
        <Container className="d-flex justify-content-around flex-wrap">
          {this.state.cl.map((s) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" className={ss.im} src={s.strMealThumb} />
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
                      this.state.bascket.find((r) => r.idMeal === s.idMeal)
                        ? "danger"
                        : "primary"
                    }
                  >
                    {this.state.bascket.find((r) => r.idMeal === s.idMeal)
                      ? "удалить корзину"
                      : " добавить в корзину"}
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </>
    );
  }
}

export default About;