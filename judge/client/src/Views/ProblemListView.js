import React, { Component } from 'react';
import CompactProblem from '../Components/CompactProblem'
import ProblemForm from '../Components/ProblemForm';

class ProblemListView extends Component {
  render() {
    return (
      <div className="ProblemListView">
        {this.props.problems.map(problem => {
            return (<CompactProblem
                      key={problem.id}
                      data={problem}
                      clickCallback={this.props.onProblemClicked}/>)
          })
        }
        <ProblemForm submitCallback={this.props.submitCallback}/>
      </div>
    );
  }
}

export default ProblemListView;
