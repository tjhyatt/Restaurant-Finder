import React, { Component } from 'react';
import './index.css';

class Display extends Component {

  render() { 
    const {name, featured_image, cuisines, phone_numbers, timings, location, price_range, user_rating} = this.props.restaurant.restaurant

    let openTimes = timings.split(',')
    
    return ( 
      <div className="display">
        <div 
          className="feature-image" 
          style={{ backgroundImage: `url(${featured_image})` }}
        >
          <div className="name">{name} <div className="small">{user_rating.aggregate_rating}</div></div>
          <div className="address">{location.address}</div>
          <div className="details">
            <div className="item"><strong>Cuisines</strong><br/>{cuisines}</div>
            <div className="item"><strong>Price</strong><br/>{'$'.repeat(price_range)}</div>
            <div className="item"><strong>Phone</strong><br/>{phone_numbers}</div>
            <div className="item"><strong>Open times</strong><br/> {openTimes.map((time, i) => { return <div key={i}>{time}</div> })}</div>
          </div>
        </div>
        
        
        
      </div>
    );
  }
}
 
export default Display;
