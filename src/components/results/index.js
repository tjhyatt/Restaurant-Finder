import React, { Component } from 'react';
import './index.css';

class Results extends Component {

  onResultClick = (event) => {
    this.props.index(event.target.attributes.data.value)
  }

  onLoadMore = () => {
    this.props.loadMore()
  }

  render() { 
    return ( 
      <div className="results">
        <div className="results-list">
          <div className="results-heading">Results</div>
          
          {this.props.results.map((restaurant, index) => {
            return <div className="result" data={index} key={index} onClick={this.onResultClick}>{restaurant.restaurant.name}</div>
          })}

          <div className="result results-footer" onClick={this.onLoadMore}>Load more</div>
        </div>
      </div>
    );
  }
}
 
export default Results;
