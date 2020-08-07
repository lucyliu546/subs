import React, { Component } from "react";
import "./styles.css";
import unitData from "./units";
import Autocompleteself from "./Autocomplete.js";
import Results from "./Results.js"
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { withStyles, withTheme } from "@material-ui/core";
import NavigationBar from "./NavigationBar.js"
import Footer from "./Footer.js"
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';

const StyledText = withStyles({
  root: {
	'& label.Mui-focused': {
	  color: 'gray',
	},
	'& .MuiInput-underline:after': {
	  borderBottomColor: '#D9D9D9',
	},
	'& .MuiOutlinedInput-root': {
	  '& fieldset': {
		borderColor: 'white',
	  },
	  '&:hover fieldset': {
		borderColor: 'white',
	  },
	  '&.Mui-focused fieldset': {
		borderColor: '#D9D9D9',
	  },
	},
	backgroundColor: 'white',
	padding: ' 10px',
	width: '4%'
  },
})(TextField);

const StyledDrop = withStyles({
  root:{
	backgroundColor: 'white',
	marginLeft: '5px',
	'&.MuiSelect-select:focus': {
	  backgroundColor: 'white',
	  height: '20px'
	},
	height: '20px'
  }
}
)(Select);

const StyledBtn = withStyles({
	root: {
		'& label.Mui-focused': {
		  color: 'gray',
		},
		'& .MuiInput-underline:after': {
		  borderBottomColor: '#D9D9D9',
		},
		'& .MuiOutlinedInput-root': {
		  '& fieldset': {
			borderColor: 'white',
		  },
		  '&:hover fieldset': {
			borderColor: 'white',
		  },
		  '&.Mui-focused fieldset': {
			borderColor: '#D9D9D9',
		  },
		}
	}
})(Button);

const StyledSnackBar = withStyles({
	root:{
		'& .MuiPaper' :{
			backgroundColor: 'gray'
		}
		
	}
})(Snackbar);

class Main extends Component {
  constructor() {
	super();
	this.state = {
	  ingredient: "",
	  input: "",
	  amount: "",
	  unit: "",
	  showResult: false,
	  errors: {ingredient: "", amount:"", unit: ""},
	  ingredientValid: null,
	  amountValid: null,
	  unitValid: null,
	  submissionValid: false,
	  userIngredients: JSON.parse(localStorage.getItem('userPantry')),
	  empty: true
	};
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
	if (this.state.ingredient !== prevState.ingredient){
	  this.setState({
		showResult: false, 
		amount: "",
		unit: "",
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
		<NavigationBar/>
		<form className="Form" onSubmit={this.handleSubmit}>
		  {/* ingredient search */}
		  <div className="textcontainer">
		  <p>Search for your ingredient</p>
		  </div>
		   <Autocompleteself 
			sendData={this.handleChange}
		  /> 
		  
		  {/* quantity textbox */}
		  <div className="textcontainer">
		  <p>Enter the quantity:</p>
		  </div>
		  <StyledText
			error = {this.state.errors.amount}
			name="amount"
			helperText={this.state.errors.amount}
			value={this.state.amount}
			onChange={this.handleChange}
		  />

		  {/* units drop-down */}
		  <StyledDrop
			name="unit"
			disableUnderline
			value={this.state.unit}
			onChange={this.handleChange}
			helperText = {this.state.errors.unit}
		  >
			{unitList}
			
		  </StyledDrop>

		  {/*submit button */}
		  <br />
		  <StyledBtn disabled = {!this.state.submissionValid} 
			type="Submit" onClick={this.handleClick} 
			className="Submit"
			style={{outline: 'None'}}>
			Find substitution!
		  </StyledBtn>
		</form>
		
		<div>
		{this.state.showResult && <Results 
			ingredient={this.state.ingredient} 
			amount={this.state.amount} 
			unit={this.state.unit}
			showResult={this.state.showResult}
		/>}	
		
		</div>
		<div>
		<StyledSnackBar
			anchorOrigin={{vertical: 'bottom', horizontal: 'left'} }
			open={this.state.userIngredients && this.state.userIngredients.length === 0}
			TransitionComponent={'TransitionUp'}
			key = {'bottom' + 'left'}
		>
			<SnackbarContent 
				message="Add ingredients using the pantry to see customized substitutions ☝ "
				style={{backgroundColor: "gray"}}
			/>
		</StyledSnackBar>
			
		
		</div>
	  <Footer />

	</div>

	);
  }
}
export default Main;
