import React, { Component } from 'react';
import axios from "axios";
import { Container, Spinner } from "react-bootstrap";
import s  from "./info.module.css"

class Info extends Component {
  constructor(props){
    super(props);
    this.state = {
      inf: [],
      lan: true,
    };
  } 
  componentDidMount(){ 
    this.setState({lan:true})
     const a = this.props.match.params.id;
     axios
       .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${a}`)
       .then((s) => {
         console.log(s);
         this.setState({ inf: s.data.meals });
       })
       .catch((errs) => console.log(errs))
       .finally(() => {
         this.setState({ lan: false });
       });
  }

  
  
 
  render() {
    return (
      <>
        {this.state.lan ? (
          <div className={s.spin}>
            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
          </div>
        ) : null}
        <Container>
          {this.state.inf.map((m) => {
            return (
              <div class="container">
                <div className="d-flex row">
                  <h2>{m.strMeal}</h2>
                </div>
                <div className=" d-flex">
                  <div className={s.div}>
                    <img src={m.strMealThumb} className={s.img} alt={'ferr'} />
                  </div>
                  <div className={s.text}>Area: {m.strArea}</div>
                  <div classN>Category: {m.strCategory}</div>
                  <div className={s.vid}>{m.strInstructions}</div>
                </div>
              </div>
            );
          })}
        </Container>
      </>
    );
  }
}

export default Info;