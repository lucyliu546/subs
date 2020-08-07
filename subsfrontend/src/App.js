import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main.js"
import Pantry from "./Pantry.js"
import Error from "./Error.js"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const App = () => {

 
  return (

    
    <div>
      <Switch>
        <Route path='/' component={Main} exact/>
        <Route path='/mypantry' component={Pantry}/>
        <Route component={Error}/>
      </Switch>
      
    </div>
  )
}

export default App;