import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

import List from "./components/List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      error: false,
      todos: [
        // {
        //   id: 1,
        //   title: "Teach Cypress Testing Suite",
        //   isComplete: false
        // }
      ]
    };
  }
  componentDidMount(){
    axios.get('/api/todos')
      .then(res=> {
        console.log('res: ', res);
        this.setState({todos: res.data})
      })
      .catch(()=> this.setState({error: true}))
  }

  handleInputChange(e){
    this.setState({
      inputText: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    axios.post('/api/todos', {
      title: this.state.inputText,
      isComplete: false
    })
    .then(res=>{
      this.setState({
        inputText: '',
        todos: res.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />

        { 
          this.state.error 
          &&  
          <span className="error">Oh Snap! Something broke!</span>
        }
        <form onSubmit={e=> this.handleSubmit(e)}>
          <input onChange={(e)=> this.handleInputChange(e)}  value={this.state.inputText} autoFocus className="new_todo" placeholder="Add new Todo" />
        </form>
        <List todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
