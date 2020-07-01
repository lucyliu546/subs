import React, {Component} from "react";
import axios from "axios";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
/* eslint-disable */

class Results extends Component {
    constructor(props) {
		super(props)
		this.state = {
			result: [],
			subslist: []
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

	render() {
		if (this.state.result.length > 0) {
			var substlist = this.state.result[0].subslist}
			
		return(
			this.state.result.length > 0 ? (
			<div>
				<List>
					{Object.entries(substlist).map((t, k) => (
					<ListItem>
						<ListItemText 
							primary={t[0]} 
							secondary={(t[1] * this.props.amount).toFixed(2) + " " + this.props.unit }/>
					</ListItem>))}
				</List>	 
            </div>) : (<span>Loading results...</span>)
        )
    }
}

export default Results