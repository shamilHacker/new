import React, { Component } from "react";
import axios from "axios";
import { Card, } from "react-bootstrap";

export default class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
     
    };
    this.setState({ lan: true });
    const a = axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.match.params.idd}`,
    );
    a.then((s) => {
      console.log(s);
      this.setState({ meals: s.data.meals });
    })
   }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props.match.params.idd) {
      axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.match.params.idd}`,
      )
      .then((s) => {
        console.log(s);
        this.setState({ meals: s.data.meals });
      });
    }
  }
 
  render() {
    return (
      <>
        
       
          <div className="d-flex justify-content-around flex-wrap ">
            {this.state.meals.map((k) => {
              return (
                <>
                  <Card className="m-3" style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={k.strMealThumb} />
                    <Card.Title>{k.strMeal}</Card.Title>
                  
                  </Card>
                </>
              );
            })}
          </div>
        )
      </>
    );
  }
}
