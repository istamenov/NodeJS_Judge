import React, { Component } from 'react';

class SolutionForm extends Component {
  constructor(){
    super();
    this.state = {
      author : "",
      code : ""
    };
  }

  onAuthorChange(e)
  {
    e.preventDefault();
    this.setState({'author' : e.target.value});
  }

  onCodeChange(e)
  {
    e.preventDefault();
    this.setState({'code' : e.target.value});
  }

  submitHandler(e)
  {
    e.preventDefault();
    if(this.author === '')
    {
      alert('Author cannot be empty');
    }
    else if(this.code === ''){
      alert('Solution cannot be empty');
    } else {
      this.props.submitCallback(this.state.author, this.state.code);
    }
  }

  render() {
    return (
      <div className="SolutionForm">
        <form onSubmit={this.submitHandler.bind(this)}>
          <label>Author</label>
          <input type="text" value={this.state.author}
                            onChange={this.onAuthorChange.bind(this)}/>
          <br/>
          <label>Code</label>
          <input type="text" value={this.state.code}
                             onChange={this.onCodeChange.bind(this)}/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default SolutionForm;
