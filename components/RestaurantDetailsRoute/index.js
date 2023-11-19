import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstents = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class RestaurantDetailsRoute extends Component {
  state = {
    restaurantDetails: {},
    foodItems: [],
    apiStauts: apiStatusConstents.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStauts: apiStatusConstents.in_progress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items.map(eachItem => ({
          id: eachItem.id,
          cost: eachItem.cost,
          foodType: eachItem.food_type,
          imageUrl: eachItem.image_url,
          name: eachItem.name,
          rating: eachItem.rating,
        })),
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      this.setState({
        restaurantDetails: updatedData,
        foodItems: updatedData.foodItems,
        apiStauts: apiStatusConstents.success,
      })
    } else {
      this.setState({
        apiStauts: apiStatusConstents.failure,
      })
    }
  }

  renderRestaurantDetails = () => {
    const {restaurantDetails, foodItems} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetails

    return (
      <>
        <div className="rest-banner-box">
          <div className="rest-image-details">
            <img src={imageUrl} alt="restaurant" className="rest-d-image" />
            <div className="rest-d-details">
              <h1 className="rest-d-name">{name}</h1>
              <p className="rest-d-cuisine">{cuisine}</p>
              <p className="rest-d-location">{location}</p>
              <div className="rest-d-rating-costfortwo-box">
                <div className="rest-review-rating-box">
                  <div className="rest-d-rating-box">
                    <AiFillStar color="#ffffff" />
                    <p className="rest-d-rating">{rating}</p>
                  </div>
                  <p className="rest-d-reviews-count">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <h1 className="rest-d-separation-pipe">|</h1>
                <div className="rest-d-costfortwo-box">
                  <p className="rest-d-costfortwo-amount">
                    <BiRupee /> {costForTwo}
                  </p>
                  <p className="rest-d-costfortwo-text">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-container">
          {foodItems.map(each => (
            <FoodItem key={each.id} restaurantItems={each} />
          ))}
        </ul>
      </>
    )
  }

  renderSuccessPage = () => (
    <div className="rest-details-responsive-box">
      {this.renderRestaurantDetails()}
    </div>
  )

  renderLoadingPage = () => (
    <div className="loader-spinner" data-testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  onRenderPageView = () => {
    const {apiStauts} = this.state
    switch (apiStauts) {
      case apiStatusConstents.success:
        return this.renderSuccessPage()
      case apiStatusConstents.failure:
        return this.renderFailurePage()
      case apiStatusConstents.in_progress:
        return this.renderLoadingPage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="rest-details-container">
        <Header />
        {this.onRenderPageView()}
        <Footer />
      </div>
    )
  }
}

export default RestaurantDetailsRoute
