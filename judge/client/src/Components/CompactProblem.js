import React, { Component } from 'react';

class CompactProblem extends Component {
  clickHandler(e){
    e.preventDefault();
    this.props.clickCallback(this.props.data.id);
  }

  render() {
    return (
      <div className="CompactProblem" onClick={this.clickHandler.bind(this)} >
        <strong><h1>{this.props.data.title}</h1></strong>
        <h2>{this.props.data.author}</h2>
      </div>
    );
  }
}

export default CompactProblem;
