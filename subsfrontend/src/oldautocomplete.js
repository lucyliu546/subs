import React, { Component } from "react";
import "./styles.css";
import "./subs.json";
import axios from "axios";
import TextField from '@material-ui/core/TextField';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
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


onTextChanged = event => {
    const value = event.target.value;
    let suggestions = [];
    if (value.length > 0) {
      this.props.sendData({name: "showResult", value: false})
      if (this.state.rawOptions) {
        const regex = new RegExp(`^${value}`, "i");
        let optionsArray = [];
        const rawOptions = this.state.rawOptions
        for (var i in rawOptions) {
          var item = rawOptions[i];
          optionsArray.push(item.subname);
        } 
        this.setState({options: optionsArray})
      
        suggestions = this.state.options.sort().filter(value => regex.test(value));
      }
    }
    this.setState({ suggestions: suggestions, input: value });
  };

suggestionSelected(value) {
    this.setState({
      input: value,
      suggestions: []
    });
    this.props.sendData({ name: "ingredient", value: value });
  };

renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    } else {
      return (
        <div>
          <ul>
            {suggestions.map(item => (
              <li onClick={() => this.suggestionSelected(item)} key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    };
  };

render() {
    return (
      <div className="AutoComplete">
        <input
          name="ingredient"
          value={this.state.input}
          type="text"
          onChange={this.onTextChanged}
        />
        {this.renderSuggestions()}
      </div>
    );
  };
}
export default Autocomplete;