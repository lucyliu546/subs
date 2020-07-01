import React, { Component } from "react";
import "./styles.css";
import unitData from "./units";
import Autocomplete from "./Autocomplete.js";
import Results from "./Results.js"
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

class App extends Component {
  constructor() {
    super();
    this.state = {
      ingredient: "",
      amount: "",
      unit: "",
      showResult: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.ingredient !== prevState.ingredient){
      this.setState({
        showResult: false
      })
    }
  }

  handleChange(event) {
    const { name, value } = event.target ? event.target : event;
    if (name === "amount") {
      if (!Number(value) && value !== "") {
        alert("Your quantity must be a number");
      }
    }
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      showResult: true
    })
  }

  render() {
    const unitList = unitData.map(unit => (
      <option key={unit.index} value={unit.name}>
        {unit.name}
      </option>
    ));
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          {/* ingredient search */}
          <p>Search for your ingredient</p>
          <Autocomplete 
            sendData={this.handleChange}
          />
          
          {/* quantity textbox */}
          <p>Enter the quantity:</p>
          <input
            type="text"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
          />

          {/* units drop-down */}
          <Select
            name="unit"
            value={this.state.unit}
            onChange={this.handleChange}
          >
            {unitList}
          </Select>

          {/*submit button */}
          <br />
          <Button type="submit" variant="outlined" onClick={this.handleClick}>
            Find substitution!
          </Button>
        </form>
		
		<div className="Results">
		{this.state.showResult && <Results 
			ingredient={this.state.ingredient} 
			amount={this.state.amount} 
			unit={this.state.unit}
			showResult={this.state.showResult}
		/>}	
        </div>
      </div>
    );
  }
}
export default App;
