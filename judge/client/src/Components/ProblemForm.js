import React, { Component } from 'react';
import TestForm from './TestForm';

class ProblemForm extends Component {
  constructor(){
    super();
    this.state = {
      problemAuthor : "",
      problemDescription : "",
      problemTitle : "",
      problemTests : []
    };
  }

  handleSubmit(e)
  {
    e.preventDefault();
    this.props.submitCallback(this.state.problemAuthor
                            , this.state.problemDescription
                            , this.state.problemTests
                            , this.state.problemTitle)
  }

  onTestChange(input, output)
  {
    let newTests = this.state.problemTests;
    newTests.push({'input' : input, 'output' : output});
    this.setState({'problemTests' : newTests});
  }

  onAuthorChange(e){
    e.preventDefault();
    this.setState({
      'problemAuthor' : e.target.value
    });
  }

  onContentsChange(e){
    e.preventDefault();
    this.setState({
      'problemDescription' : e.target.value
    });
  }

  onTitleChange(e){
    e.preventDefault();
    this.setState({
      'problemTitle' : e.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Your New Problem</label>
        <br/>
        <label>Author</label>
        <input type="text" onChange={this.onAuthorChange.bind(this)}/>
        <br/>
        <label>Title</label>
        <input type="text" onChange={this.onTitleChange.bind(this)}/>
        <br/>
        <label>Description</label>
        <input type="text" onChange={this.onContentsChange.bind(this)}/>
        <br/>
        <TestForm tests={this.state.problemTests} addTest={this.onTestChange.bind(this)} />
        <input type="submit" value="Submit Problem" />
      </form>
    );
  }
}

export default ProblemForm;
