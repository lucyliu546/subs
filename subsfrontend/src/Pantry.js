import React, { Component } from 'react';
import NavigationBar from "./NavigationBar.js"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import KitchenIcon from '@material-ui/icons/Kitchen';
import DeleteIcon from '@material-ui/icons/Delete';
import "./subs.json";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from "@material-ui/core";
import Footer from "./Footer.js"
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

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
	boxShadow: '0 3px 3px 2px rgba(240, 105, 135, .3)'
  },
})(TextField);

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
	  }, 
	  alignContent: 'left',
	  marginLeft: '.2%',
	  display: 'inline-grid',
	  paddingTop: '15px',
	  paddingBottom: '15px',
	  transform: 'translateY(4px)'
  },
  
})(Button);



class Pantry extends Component {
  constructor(props) {
	super(props);
	this.state = {
	  input: "",
	  ingredients: [],
	  userIngredients: JSON.parse(localStorage.getItem('userPantry')),
	  suggestions: [],
	  rawOptions: [],
	  showBtn: false,
	  clear: false,
	  
	  
	};
	this.handleClick = this.handleClick.bind(this)
	this.filterOptions = this.filterOptions.bind(this)
	this.setLocalStorage = this.setLocalStorage.bind(this)
  }
  async componentDidMount() {
	await axios.get("http://127.0.0.1:8000/api/subs/").then( 
	  response => { 
		var result = response.data; 
		this.setState({ rawOptions: result.map(i => {
			return i.subname
		}) })
		}, 
	(error) => { 
	{alert(error)}; 
		} 
  	); 
	await axios.get("http://127.0.0.1:8000/api/inventories/").then( 
	  response => { 
		var result = response.data; 
		this.setState({ 
			TESTpantry: result
		 })
		}, 
	(error) => { 
	{alert(error)}; 
		} 
	  ); 
	this.filterOptions()
  }

/* Once a user clicks add  */
  async handleClick() {
	await this.setState(prevstate => ({
		userIngredients: prevstate.userIngredients.concat(prevstate.ingredients),
		ingredients: [],
		clear: !prevstate.clear
	  }
	  ))
	  this.filterOptions()
	  this.setLocalStorage()
  }

/* Refreshes dropdown based on what user adds/deletes  */
  filterOptions(){
	const options = []
	const rawOptions = this.state.rawOptions
	const userIngredients = this.state.userIngredients
	for (var val of rawOptions) {
		const found = userIngredients.includes(val)
		if (found === false) {
			options.push(val)
		} 
	 }
	this.setState({
		rawOptions: options
	})
  }

/* stores user's pantry in localstorage */
  setLocalStorage() {
	localStorage.setItem('userPantry', JSON.stringify(this.state.userIngredients))
  }

/* Adds what user selects in dropdown to a temp array */
suggestionSelected (valuearray) {
  if (valuearray !== null) {
	this.setState({
	  ingredients: valuearray.map(i => {
		return i
	  }),
	  showBtn: true

	});
  };
  }

/* If a user clicks the delete icon */
deleteIngr = async (ingr) => {
  await this.setState( prevstate => ({
	userIngredients: prevstate.userIngredients.filter(item => item != ingr),
	rawOptions: prevstate.rawOptions.concat(ingr)
  }))
  this.setLocalStorage()
}


  render() {
	const hasIngr = this.state.userIngredients.length > 0
	const useringr = this.state.userIngredients
	 
	return (
	  <div className="App">
	  <NavigationBar/>

	  {/*Ingredient input box */}
	  <div className="PantrySearch">
	 <Autocomplete
	  multiple
	  name = 'ingredient'
	  key = {this.state.clear}
	  onChange = {(event, valuearray) => this.suggestionSelected(valuearray)} 
	  id="autocomplete-box"
	  options = {this.state.rawOptions}
	  getOptionLabel={(option) => option}
	  
	  disableClearable 
	  style={{ width: 700,
				display: 'inline-block',
				position: 'relative',
				background: 'white',
				alignContent: 'left',
				marginTop: '2%',
				'&$cssFocused $notchedOutline': {
				  borderColor: '#448cff',
			  },
			  '&:hover $notchedOutline':{
				  borderColor:'#FFFFFF'
			  }
			   }}
	  renderInput={(params) => <StyledText {...params} label="Ingredient" variant="outlined" />}
	/>

	{/*Submit button*/}
	<StyledBtn disabled = {this.showBtn} type="Submit" onClick={this.handleClick} className="Submit"
				>
			Add
	</StyledBtn>
	
	</div>
	{/*Pantry list*/}
	
	{hasIngr && (
	  <div style={{minWidth: '570px', width: '570px', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', 
				  backgroundColor: '#ffd1df', color: 'gray', maxHeight: '800px'}}>
	  <List dense style={{overflowY:'scroll', maxHeight: '500px', width: '550'}}>
		{useringr.map(i => (
				<ListItem style={{backgroundColor: 'rgb(255,255,255, .5)', margin: '5px',  maxWidth: '540px'}}>
				<ListItemAvatar> 
				  <Avatar>
					<KitchenIcon />
				  </Avatar>
				</ListItemAvatar>
				<ListItemText disableTypography
				  primary= {i}
				  style = {{fontSize: '18px'}}
				/>
				<ListItemSecondaryAction style={{marginRight: '5px'}}>
				  <IconButton onClick={() => this.deleteIngr(i)} edge="end" aria-label="delete">
					<DeleteIcon />
				  </IconButton>
				</ListItemSecondaryAction>
			  </ListItem>
			  ))}
	  </List>
	  </div>
	)
	}
	{!hasIngr && 
	<div style={{maxWidth: '775px', minHeight: '100px', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', 
	backgroundColor: '#ffd1df', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		<h1 style={{color:'gray', fontSize:'25px', backgroundColor: 'rgb(255,255,255, .5)', padding: '7px' }}>Your pantry is empty <br /> Use the search box to add some ingredients! </h1>
		
	  </div>

	}
	  <Footer />
	  </div>
	);
  }
}

export default Pantry;