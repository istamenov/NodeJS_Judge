import React, { Component } from 'react';
import './App.css';
import ProblemView from './Views/ProblemView';
import ProblemListView from './Views/ProblemListView';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      listView : true,
      problem : {},
      problemList : []
    }
  }

  loadProblems(){
    axios.get('/api/problems').then(response => {
      this.setState({problemList : response.data});
    });
  }

  loadSingleProblem(id){
    axios.get('/api/problem/' + id).then(response => {
      this.setState({problem : response.data[0], listView : false});
    });
  }

  componentWillMount(){
    this.loadProblems();
  }

  onProblemSubmit(author, description, tests, title){
    let newProblem = {
      'author' : author,
      'description' : description,
      'tests' : tests,
      'title' : title,
      'solutions' : []
    };
    axios.post('/api/problems', newProblem).then(response => {
        this.loadProblems()
      }).catch(error => {
        alert("Could not problem solution. Try again later.")
      });
  }

  onProblemClicked(id){
    this.loadSingleProblem(id);
  }

  onSolutionSubmit(author, code){
    let solution = {'author' : author, 'code' : code};
    axios.post('/api/problem/' + this.state.problem.id, solution).then(response => {
        this.loadSingleProblem(this.state.problem.id);
      }).catch(function (error) {
        alert("Could not add solution. Try again later.")
      });
  }

  render() {
    if(this.state.listView)
    {
      return (
        <ProblemListView
          problems = {this.state.problemList}
          submitCallback = {this.onProblemSubmit.bind(this)}
          onProblemClicked = {this.onProblemClicked.bind(this)}
        />
      );
    }
    else{
      return(
        <ProblemView
            submitCallback = {this.onSolutionSubmit.bind(this)}
            problem = {this.state.problem}
        />
      );
    }
  }
}

export default App;
