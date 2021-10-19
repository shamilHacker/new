import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Content from "./content"
import { Switch, Route,  } from "react-router-dom";
import About from "./About"
import Info from "./Info";
import Search from './component.js/Search'
import Bascket from "./bascket"
import Bot from "./bot"
import Items from "./items"
import Navibar from './component.js/navibar';


function App() {
    return (
      <>
      <Navibar/>
        <Switch>
          <Route path="/items/:idd" component={Items} />
          <Route path="/bascket" component={Bascket} />
          <Route path="/info/:id" component={Info} />
          <Route path="/c/:title" component={About} />
          <Route path="/search/:text2" component={Search} />
          <Route path="/bot" component={Bot} />
          <Route path="/">
            <Content />
          </Route>
        </Switch>
      </>
    );
  }

export default App;
