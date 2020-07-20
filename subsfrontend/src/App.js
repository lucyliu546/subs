import React, { Component } from "react";
import "./styles.css";
import unitData from "./units";
import Autocomplete from "./Autocomplete.js";
import Results from "./Results.js"
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import FormErrors from "./FormErrors.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      ingredient: "",
      amount: "",
      unit: "",
      showResult: false,
      errors: {ingredient: "", amount:"", unit: ""},
      ingredientValid: true,
      amountValid: true,
      unitValid: true,
      submissionValid: false
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
    this.setState(
      {[name]: value},
      () => {this.validateFields(name, value)})
    }
    
  validateFields(name, value) {
    let fieldErrors = this.state.errors
    const formFields = Object.keys(this.state.errors)
    if (formFields.includes(name)) {
      fieldErrors[name]= value.length > 0 ? '': 'Please choose a valid ' + name
      this.setState({
        errors: fieldErrors,
        [`${name}Valid`]: (value.length > 0 ? true: false)
      }, this.validateForm)
  } 
  }

  validateForm(){
    this.setState({
      submissionValid: this.state.ingredientValid && this.state.amountValid && this.state.unitValid
    })
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
          <TextField
            error = {this.state.errors.amount}
            variant = "filled"
            name="amount"
            helperText={this.state.errors.amount}
            value={this.state.amount}
            onChange={this.handleChange}
          />

          {/* units drop-down */}
          <Select
            name="unit"
            className="Select"
            value={this.state.unit}
            onChange={this.handleChange}
            helperText = {this.state.errors.unit}
          >
            {unitList}
            
          </Select>

          {/*submit button */}
          <br />
          <Button disabled = {!this.state.submissionValid} type="Submit" variant="outlined" onClick={this.handleClick} className="Submit">
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
