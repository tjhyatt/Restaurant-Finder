import React, { Component } from 'react';
import './index.css';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class Filter extends Component {

  onCategoryChange = (event) => {
    this.props.category(event.target.value);
  }

  onCuisineChange = (event) => {
    this.props.cuisine(event.target.value, event.target.checked);
  }

  onRatingChange = (values) => {
    this.props.rating(values)
  }

  onCostChange = (values) => {
    this.props.cost(values)
  }

  render() { 
    return ( 
      <div className="filter">
        <div className={this.props.isSearching ? 'overlay active' : 'overlay'}></div>
        <div className="filter-list">

          <div className="list-headings">
            <div className="heading">Category</div>
            <div className="heading">Cuisine</div>
          </div>
          
          <div className="list-blocks">
            <div className="list-items">
              <div className="item">
                <input type="radio" name="category" id="dining" value="2" onChange={this.onCategoryChange} />
                <label htmlFor="dining">Dining</label>
              </div>
              <div className="item">
                <input type="radio" name="category" id="takeaway" value="5" onChange={this.onCategoryChange} />
                <label htmlFor="takeaway">Take-Away</label>
              </div>
              <div className="item">
                <input type="radio" name="category" id="delivery" value="1" onChange={this.onCategoryChange} />
                <label htmlFor="delivery">Delivery</label>
              </div>
              <div className="item">
                <input type="radio" name="category" id="pubsbars" value="11" onChange={this.onCategoryChange} />
                <label htmlFor="pubsbars">Pubs & Bars</label>
              </div>
            </div>

            <div className="list-items">
              <div className="item">
                <input type="checkbox" name="cuisine" id="cafefood" value="1039" onChange={this.onCuisineChange} />
                <label htmlFor="cafefood">Cafe Food</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="coffeetea" value="161" onChange={this.onCuisineChange} />
                <label htmlFor="coffeetea">Coffee and Tea</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="pizza" value="82" onChange={this.onCuisineChange} />
                <label htmlFor="pizza">Pizza</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="fastfood" value="40" onChange={this.onCuisineChange} />
                <label htmlFor="fastfood">Fast Food</label>
              </div>
            </div>

            <div className="list-items">
              <div className="item">
                <input type="checkbox" name="cuisine" id="asian" value="3" onChange={this.onCuisineChange} />
                <label htmlFor="asian">Asian</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="bakery" value="5" onChange={this.onCuisineChange} />
                <label htmlFor="bakery">Bakery</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="italian" value="55" onChange={this.onCuisineChange} />
                <label htmlFor="italian">Italian</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="sandwich" value="304" onChange={this.onCuisineChange} />
                <label htmlFor="sandwich">Sandwich</label>
              </div>
            </div>

            <div className="list-items">
              <div className="item">
                <input type="checkbox" name="cuisine" id="chinese" value="25" onChange={this.onCuisineChange} />
                <label htmlFor="chinese">Chinese</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="pubfood" value="983" onChange={this.onCuisineChange} />
                <label htmlFor="pubfood">Pub Food</label>
              </div>
              <div className="item">
                <input type="checkbox" name="cuisine" id="other" value="110" onChange={this.onCuisineChange} />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          
          </div>
        </div>


        <div className="filter-sliders">
          <div className="slider-block">
            <div className="heading">Rating</div>
            <Nouislider range={{ min: 0, max: 5 }} start={[0, 5]} step={1} connect onEnd={this.onRatingChange} />
            <div className="markers">
              <div>0</div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
          </div>
          <div className="slider-block">
            <div className="heading">Cost</div>
            <Nouislider range={{ min: 1, max: 4 }} start={[1, 4]} step={1} connect onEnd={this.onCostChange} />
            <div className="markers">
              <div>$</div>
              <div>$$</div>
              <div>$$$</div>
              <div>$$$$</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
 
export default Filter;
