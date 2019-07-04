import React, { Component } from 'react';
import './index.css';

class Display extends Component {

  render() { 
    const {name, featured_image, cuisines, phone_numbers, timings, location} = this.props.restaurant.restaurant

    let openTimes = timings.split(',')
    
    return ( 
      <div className="display">
        <div 
          className="feature-image" 
          style={{ backgroundImage: `url(${featured_image})` }}
        >
          <div className="name">{name}</div>
          <div className="address">{location.address}</div>
          <div className="details">
            <div><strong>Cuisines</strong><br/>{cuisines}</div>
            <div><strong>Phone</strong><br/>{phone_numbers}</div>
            <div><strong>Open</strong><br/> {openTimes.map((time, i) => { return <div key={i}>{time}</div> })}</div>
          </div>
        </div>
        <p>Rating: {this.props.restaurant.restaurant.user_rating.aggregate_rating}</p>
        <p>Cost: {this.props.restaurant.restaurant.price_range}</p>
        
        
        
      </div>
    );
  }
}
 
export default Display;
