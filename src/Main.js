import React, { Component } from 'react';
import axios from 'axios';
import Filter from './components/filter';
import Results from './components/results';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      cuisine: [],
      rating: [0, 5],
      cost: [0, 4],
      results: [],
      resultStartPoint: 0,
      resultsShown: 0,
      hasResultsBeenUpdated: false,
      isReadyToUpdate: true
    }
  }

  componentDidUpdate() {
    if (!this.state.hasResultsBeenUpdated && this.state.isReadyToUpdate) {
      console.log('updating')
      this.restaurantSearch()
    }
  }

  restaurantSearch() {
    const config = { headers: {'user-key': 'b7bd715c6a64fa152add1f296336b0fe '} }; 
    let apiString = 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city';

    let start = '&start=' + this.state.resultStartPoint;
    let category = '&category=' + this.state.category;
    let cuisine = '&cuisines=';

    // build cuisine string
    if (this.state.cuisine.length > 0) {
      this.state.cuisine.forEach(element => {
        cuisine += element + ','
      });
    }

    // clear old results
    this.setState({ 
      results: [],
      resultStartPoint: 0,
      resultsShown: 0,
      hasResultsBeenUpdated: true,
      isReadyToUpdate: false 
    })


    
    axios.get(apiString + start + category + cuisine, config).then(res => { 
      console.log(res.data)
      res.data['restaurants'].forEach(restaurant => {

        // filter rating & cost
        const rating = restaurant.restaurant.user_rating.aggregate_rating
        const cost = restaurant.restaurant.price_range

        if (rating >= this.state.rating[0] && rating <= this.state.rating[1]) {
          this.setState({
            results: [...this.state.results, restaurant],
            resultsShown: this.state.resultsShown + 1,
            hasResultsBeenUpdated: true,
            isReadyToUpdate: false
          })
        }
      })

      // allow update to happen
      this.setState({
        isReadyToUpdate: true
      })
    }) 
  }

  onFilterCatChange = (cat) => {
    this.setState({
      category: cat,
      hasResultsBeenUpdated: false,
    })
  }

  onFilterCuisineChange = (cuisine, isChecked) => {
    if (isChecked) {
      console.log("Add")
      this.setState({
        cuisine: [...this.state.cuisine, cuisine],
        hasResultsBeenUpdated: false
      })
    } else {
      console.log("Remove")
      const oldCuisines = [...this.state.cuisine]
      let currentCuisines = oldCuisines.filter(id => id !== cuisine)
      this.setState({
        cuisine: currentCuisines,
        hasResultsBeenUpdated: false
      })
    }
  }

  onRatingChange = (rating) => {
    this.setState({
      rating: [parseInt(rating[0]), parseInt(rating[1])],
      hasResultsBeenUpdated: false
    })
  }

  onCostChange = (costMin, costMax) => {

  }

  onResultClick = (index) => {
    console.log(index)
  }

  render() {
    return (
      <>
        <Filter 
          category={this.onFilterCatChange} 
          cuisine={this.onFilterCuisineChange} 
          rating={this.onRatingChange} 
          cost={this.onCostChange} 
        />
        <Results 
          results={this.state.results} 
          index={this.onResultClick} 
        />
        
      </>
    );
  }
}
 
export default Main;
