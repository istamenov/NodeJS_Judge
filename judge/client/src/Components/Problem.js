import React, { Component } from 'react';
import UserSolution from './UserSolution';

class Problem extends Component {
  render() {
    console.log(this.props.problem.author);
    return (
      <div className="Problem">
        <h1>{this.props.problem.title}</h1>
        <h2>{this.props.problem.description}</h2>
        <h2>{this.props.problem.author}</h2>
        {this.props.problem.solutions.map(sol => {
            return (<UserSolution solution={sol}/>);
          })
        }
      </div>
    );
  }
}

export default Problem;
