import React, { Component } from 'react';
import Problem from '../Components/Problem';
import SolutionForm from '../Components/SolutionForm';

class ProblemView extends Component {
  render() {
    return (
      <div className="ProblemView">
        <Problem problem = {this.props.problem} />
        <SolutionForm submitCallback = {this.props.submitCallback}/>
      </div>
    );
  }
}

export default ProblemView;
