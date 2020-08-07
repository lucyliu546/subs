import React, {Component} from "react";
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import { withStyles, withTheme } from "@material-ui/core";
import Button from "@material-ui/core/Button";

/* eslint-disable */


/* Displays the substitution results at the bottom of the main page */


const StyledBtn = withStyles({
	backgroundColor: 'gray',
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

class Results extends Component {
    constructor(props) {
		super(props)
		this.state = {
			result: [],
			subslist: [],
		
			userIngredients: JSON.parse(localStorage.getItem('userPantry'))
		}
	}

	
	async componentDidMount() {
		await axios.get(encodeURI("http://127.0.0.1:8000/api/subs/?format=json&subname="
		.concat((this.props.ingredient).toString())
			)).then( 
        response => { 
			var result = response.data; 
			this.setState({ result: result })
            }, 
            (error) => { 
            {alert(error)}; 
            } 
		)
		} 
	
	async componentDidUpdate() {
		if (this.state.result[0].subname !== this.props.ingredient ){
		await axios.get(encodeURI("http://127.0.0.1:8000/api/subs/?format=json&subname="
		.concat((this.props.ingredient).toString())
			)).then( 
        response => { 
			var result = response.data; 
			this.setState({ result: result })
            }, 
            (error) => { 
            {alert(error)}; 
            } 
		)
		} 
	}

	handleClick = () => {
		this.setState({
			showAnyways: true
		})
	}

	showAnywaysCheck = () => {
		this.state.showAnyways
	}

	render() {
		if (this.state.result.length > 0) {
			var substlist = this.state.result[0].subslist
			const ingredientList = Object.entries(substlist).map(t => t[0])
			
			var userHasIngrs = ingredientList.every(i => this.state.userIngredients.includes(i))
		}
			
		return(
			 (this.state.result.length > 0) ? (
				(userHasIngrs !== false || this.state.userIngredients.length === 0 || this.state.showAnyways) ? (
					<div className="Results">
					<div className="List">
						<List>
							{Object.entries(substlist).map((t, k) => (
							<ListItem className="ListItem">
								<ListItemText 
									primary={t[0]} 
									secondary={(t[1] * this.props.amount).toFixed(2) + " " + this.props.unit }/>
							</ListItem>))}
						</List>	 
					</div>
					</div>
				) : (
					<div>
						<div style={{maxWidth: '775px', minWidth: '500px', width: '500px', marginTop: '50px', 
					backgroundColor: '#ffd1df', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', borderRadius: '25px'}}>
							<h3 style={{color:'gray', fontSize:'22px', backgroundColor: 'rgb(255,255,255, .5)', padding: '7px', marginTop: 'auto', marginBottom: 'auto', borderRadius: '25px'}}>
								Your pantry does not have any of the substitute ingredients ☹ <br />
							</h3>
						</div>
						<StyledBtn type="Submit" onClick={this.handleClick} className="Submit"
						style={{backgroundColor: '#DADADA', outline: 'None', marginTop: '2px' }}>
						Show results anyways
						</StyledBtn>
						</div>)
			) : (<div style={{maxWidth: '150px', marginLeft: 'auto', marginRight:'auto', marginTop: '2%', height: '25px'}}>
					<LinearProgress color="secondary"/><h2 style={{backgroundColor: 'white', opacity: '0.7', padding: '2px', fontSize: '20px' }}>Loading...</h2>
				</div>)
        )
    }
}

export default Results