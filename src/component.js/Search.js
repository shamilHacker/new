import React, { Component } from 'react';
import axios from "axios"
import {Card, Container} from 'react-bootstrap'

class Search extends Component {
  state = {
    meals: [],
  }
  axa = () =>{
     axios
       .get(
         `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.match.params.text2}`,
       )
       .then((v) => {
         this.setState({ meals: v.data.meals });
       });
  }
  componentDidMount(){
    this.axa()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.text !== this.props.match.params.text2) {
     this.axa()
    }
  }
  render() {
    return (
      <>
        <Container className="d-flex justify-content-around flex-wrap">
          {this.state.meals.map((s) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={s.strMealThumb} />
                <Card.Body>
                  <Card.Title>
                    {s.strMeal}
                  </Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </>
    );
  }
}

export default Search;