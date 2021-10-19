import React from 'react';
import { Card, Container, Spinner, } from "react-bootstrap";
import "react-bootstrap";
import axios from 'axios'
import {Link} from "react-router-dom"
import dd from "./content.module.css"

class content extends React.Component {
  state = {
    category: [],
    lan: true,
  };

  componentDidMount() {
    this.setState({ lan: true });

    const a = axios.get(
      `https://www.themealdb.com/api/json/v1/1/categories.php`,
    );
    a.then((response) => {
      console.log(response);
      this.setState({ category: response.data.categories });
    })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ lan: false });
      });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.text !== this.props.match.params.text) {
  //     axios
  //       .get(
  //         `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.match.params.text}`,
  //       )
  //       .then(({ data }) => {
  //         console.log(data);
  //       });
  //   }
  // }

  render() {
    console.log(this.state.category);
    return (
      <>
        {this.state.lan ? (
          <div className={dd.spin}>
            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
          </div>
        ) : null}

        <Container className="d-flex justify-content-around flex-wrap">
          {this.state.category.map((v) => {
            return (
              <Card
                as={Link}
                to={`c/${v.strCategory}`}
                style={{ width: "18rem" }}
              >
                <Card.Img variant="top" src={v.strCategoryThumb} />
                <Card.Body>
                  <Card.Title>{v.strCategory}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </>
    );
  }
}

export default content;