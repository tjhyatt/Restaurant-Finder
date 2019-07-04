import React, { Component } from 'react';
import axios from 'axios';
import './Main.css';
import Filter from './components/filter';
import Results from './components/results';
import Display from './components/display';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      cuisine: [],
      rating: [0, 5],
      cost: [1, 4],
      results: [],
      resultsStartPoint: 0,
      resultsCurrentPoint: 0,
      resultsShown: 0,
      resultsShownTarget: 20,
      resultsFound: 0,
      canResultsUpdate: false,
      selectedRestaurant: null
    }
  }

  componentDidMount() {
    this.restaurantSearch()
  }

  componentDidUpdate() {
    if (this.state.canResultsUpdate) {
      this.restaurantSearch()
    }
  }

  restaurantSearch() {
    const config = { headers: {'user-key': 'b7bd715c6a64fa152add1f296336b0fe '} }
    let apiString = this.getSearchString()

    // clear old results
    this.setState({ 
      results: [],
      resultsStartPoint: 0,
      resultsShown: 0,
      canResultsUpdate: false,
      selectedRestaurant: null
    })
    
    axios.get(apiString, config).then(res => { 

      this.setState({
        resultsCurrentPoint: this.state.resultsCurrentPoint + res.data.results_shown
      })

      res.data['restaurants'].forEach(restaurant => {

        // filter rating & cost
        const rating = restaurant.restaurant.user_rating.aggregate_rating
        const cost = restaurant.restaurant.price_range

        if (rating >= this.state.rating[0] && rating <= this.state.rating[1]) {
          if (cost >= this.state.cost[0] && cost <= this.state.cost[1]) {
            console.log("adding", restaurant)
            this.setState({
              results: [...this.state.results, restaurant],
              resultsShown: this.state.resultsShown + 1,
            })
          }
        }
      })
    }) 
  }

  loadMoreResults() {
    const config = { headers: {'user-key': 'b7bd715c6a64fa152add1f296336b0fe '} }
    let apiString = this.getSearchString(this.state.resultsCurrentPoint)

    let totalResultsFound

    axios.get(apiString, config).then(res => { 

      this.setState({
        resultsCurrentPoint: this.state.resultsCurrentPoint + res.data.results_shown
      })

      // get total results found
      totalResultsFound = res.data.results_found

      res.data['restaurants'].forEach(restaurant => {

        // filter rating & cost
        const rating = restaurant.restaurant.user_rating.aggregate_rating
        const cost = restaurant.restaurant.price_range

        if (rating >= this.state.rating[0] && rating <= this.state.rating[1]) {
          if (cost >= this.state.cost[0] && cost <= this.state.cost[1]) {
            console.log("adding", restaurant)
            this.setState({
              results: [...this.state.results, restaurant],
              resultsShown: this.state.resultsShown + 1,
            })
          }
        }
      })
    }).then(() => {
      if (this.state.resultsShown < this.state.resultsShownTarget) {
        if (this.state.resultsCurrentPoint > totalResultsFound) {
          // end on results
          console.log("no more results")
          return
        } else {
          // keep searching
          this.loadMoreResults()
        }
      }
    })
  }

  getSearchString(startingPoint = 0) {
    let apiString = 'https://developers.zomato.com/api/v2.1/search?entity_id=297&entity_type=city';

    let start = '&start=' + startingPoint;
    let category = '&category=' + this.state.category;
    let cuisine = '&cuisines=';

    // build cuisine string
    if (this.state.cuisine.length > 0) {
      this.state.cuisine.forEach(element => {
        cuisine += element + ','
      });
    }

    return apiString + start + category + cuisine
  }

  onFilterCatChange = (cat) => {
    this.setState({
      category: cat
    })

    this.restaurantSearch()
  }

  onFilterCuisineChange = (cuisine, isChecked) => {
    if (isChecked) {
      this.setState({
        cuisine: [...this.state.cuisine, cuisine],
        canResultsUpdate: true
      })
    } else {
      const oldCuisines = [...this.state.cuisine]
      let currentCuisines = oldCuisines.filter(id => id !== cuisine)
      this.setState({
        cuisine: currentCuisines,
        canResultsUpdate: true
      })
    }

    //this.restaurantSearch()
  }

  onRatingChange = (rating) => {
    this.setState({
      rating: [parseInt(rating[0]), parseInt(rating[1])],
      canResultsUpdate: true
    })
  }

  onCostChange = (cost) => {
    this.setState({
      cost: [parseInt(cost[0]), parseInt(cost[1])],
      canResultsUpdate: true
    })
  }

  onResultClick = (index) => {
    this.setState({
      selectedRestaurant: index
    })
  }

  onLoadMore = () => {
    this.loadMoreResults()
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
        <div className="display-wrapper">
          <Results 
            results={this.state.results} 
            index={this.onResultClick} 
            loadMore={this.onLoadMore}
          />
          {this.state.selectedRestaurant !== null ?
          <Display restaurant={this.state.results[this.state.selectedRestaurant]} />
          : null}
        </div>
      </>
    );
  }
}
 
export default Main;
