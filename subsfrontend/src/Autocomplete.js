import React, { Component } from "react";
import "./styles.css";
import "./subs.json";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles } from "@material-ui/core";

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

class Autocompleteself extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      ingredient: "",
      suggestions: [],
      rawOptions: [],
      options: []
    };
  }

  async componentDidMount() {
    await axios.get("http://127.0.0.1:8000/api/subs/").then( 
      response => { 
        var result = response.data; 
        this.setState({ rawOptions: result })
        }, 
    (error) => { 
    {alert(error)}; 
    } 
    ); 
    }

suggestionSelected (value) {
  if (value !== null) {
    this.props.sendData({name: "showResult", value: false})
    this.setState({
      ingredient: value.subname,

    });
    this.props.sendData({ name: "ingredient", value: value.subname });
    };
  }


render() {
  return (
    <div>
     <Autocomplete
      name = 'ingredient'
      
      
      onChange = {(event, value) => this.suggestionSelected(value)} 
      id="autocomplete-box"
      options={this.state.rawOptions}
      getOptionLabel={(option) => option.subname}
      disableClearable 
      style={{ width: 700,
                background: 'white',
                justifyContent: 'center',
                margin: '0 auto',
                '&$cssFocused $notchedOutline': {
                  borderColor: '#448cff',
              },
              '&:hover $notchedOutline':{
                  borderColor:'#FFFFFF'
              }
               }}
      renderInput={(params) => <StyledText {...params} label="Ingredient" variant="outlined"/>}
    />
    </div>
  )
  
}
}

export default Autocompleteself
