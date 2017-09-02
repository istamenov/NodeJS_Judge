import React, { Component } from 'react';

class UserSolution extends Component {
  render() {
    let results = [];
    for (var res in this.props.solution.results)
    {
      if(this.props.solution.results[res] === 'p'){
        results.push((<img src={"http://icons.iconarchive.com/icons/mattahan/umicons/128/Letter-F-icon.png"} alt={""}/>));
      }
      else{
        results.push((<img src={"http://icons.iconarchive.com/icons/mattahan/umicons/128/Letter-P-icon.png"} alt={""}/>));
      }
    };
    return (
      <div className="UserSolution">
        <h1>{this.props.solution.author}</h1>
        <span>{this.props.solution.date}</span>
        {results}
      </div>
    );
  }
}

export default UserSolution;
