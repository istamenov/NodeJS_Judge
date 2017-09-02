import React, { Component } from 'react';

class TestForm extends Component {
  constructor(){
    super();
    this.state = {
      currentInput : "",
      currentOutput : ""
    }
  }

  clickHandler(e){
    this.props.addTest(this.state.currentInput, this.state.currentOutput);
    this.setState({'currentOutput' : "", 'currentInput' : ""});
  }

  onInputChange(e){
    e.preventDefault();
    this.setState({
      'currentInput' : e.target.value
    });
  }

  onOutputChange(e){
    e.preventDefault();
    this.setState({
      'currentOutput' : e.target.value
    });
  }

  render() {
    return (
      <div className="TestForm">
        <label>Tests</label>
        <br/>
        <label>Input</label>:<label>Output</label>
        {this.props.tests.map( test =>{
            return (<div>
                    <input type='text' readonly value = {test.input}/> :
                    <input type='text' readonly value = {test.output}/>
                  </div>);
        })
        }
        <input type='text' value={this.state.currentInput} onChange={this.onInputChange.bind(this)}/>
        <input type='text' value={this.state.currentOutput} onChange={this.onOutputChange.bind(this)}/>
        <input type='button' onClick={this.clickHandler.bind(this)} value="Add Test"/>
      </div>
    );
  }
}

export default TestForm;
