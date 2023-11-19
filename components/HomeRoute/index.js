import Cookies from 'js-cookie'
import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Slider from 'react-slick'
// import {Pagination} from '@mui/material'
import {
  BsFilterLeft,
  BsCaretDownFill,
  BsCaretLeftSquare,
  BsCaretRightSquare,
} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'
import './index.css'

const apiStatusConstents = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const apiStatusImages = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class HomeRoute extends Component {
  state = {
    imagesList: [],
    restaurantsList: [],
    sortType: sortByOptions[0].value,
    activePage: 1,
    apiStatus: apiStatusConstents.initial,
    apiImagesStatus: apiStatusImages.initial,
  }

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantsList()
  }

  getCarouselImages = async () => {
    this.setState({apiImagesStatus: apiStatusImages.in_progress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const imagesList = data.offers
      this.setState({imagesList, apiImagesStatus: apiStatusImages.success})
    } else {
      this.setItem({apiImagesStatus: apiStatusImages.failure})
    }
  }

  getRestaurantsList = async () => {
    this.setState({apiStatus: apiStatusConstents.in_progress})
    const {activePage, sortType} = this.state
    const token = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortType}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const modifiedList = data.restaurants.map(eachItem => ({
        id: eachItem.id,
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        hasOnlineDelivery: eachItem.has_online_delivery,
        hasTableBooking: eachItem.has_table_booking,
        imageUrl: eachItem.image_url,
        isDeliveringNow: eachItem.is_delivering_now,
        location: eachItem.location,
        menuType: eachItem.menu_type,
        name: eachItem.name,
        opensAt: eachItem.opens_at,
        userRating: {
          rating: eachItem.user_rating.rating,
          ratingColor: eachItem.user_rating.rating_color,
          totalReviews: eachItem.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: modifiedList,
        apiStatus: apiStatusConstents.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstents.failure})
    }
  }

  renderCarousels = () => {
    const settings = {
      dots: true,
      infinite: true,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: 'linear',
      arrows: false,
    }
    const {imagesList} = this.state
    return (
      <ul className="carousel-box">
        <Slider {...settings}>
          {imagesList.map(eachImage => (
            <li>
              <img
                src={eachImage.image_url}
                alt="offer"
                className="carousel-img"
                key={eachImage.id}
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderRestaurants = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list" testid="restaurant-item">
        {restaurantsList.map(eachRestaurantItem => (
          <RestaurantItem
            data={eachRestaurantItem}
            key={eachRestaurantItem.id}
          />
        ))}
      </ul>
    )
  }

  onChangeHighestPage = () => {
    const {restaurantsList, activePage} = this.state
    if (activePage <= restaurantsList.length) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantsList,
      )
    } else {
      this.setState(prevState => ({activePage: prevState.activePage}))
    }
  }

  onChangeLowestPage = () => {
    const {activePage} = this.state
    if (activePage > 0) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsList,
      )
    }
  }

  onChangeSelectOption = event => {
    this.setState({sortType: event.target.value}, this.getRestaurantsList)
  }

  renderSuccessPage = () => {
    const {sortType, activePage} = this.state
    // const lowestSortClass =
    //   sortType === 'Lowest' ? 'sort-option selected' : 'sort-option'
    // const highestSortClass =
    //   sortType === 'Highest' ? 'sort-option selected' : 'sort-option'
    return (
      <div className="home-body">
        <h1 className="popular-rest-text">Popular Restaurants</h1>
        <div className="caption-filter-box">
          <p className="caption">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="fliter-box">
            <BsFilterLeft className="filter-icon" />
            <p className="filter-text">Sort By {sortType}</p>
            <select value={sortType} onChange={this.onChangeSelectOption}>
              {sortByOptions.map(eachOption => (
                <option
                  value={eachOption.value}
                  key={eachOption.id}
                  className="sort-option"
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hr-rule" />
        <div className="restaurants-box">{this.renderRestaurants()}</div>
        <div className="pagination-box">
          <p testid="active-page-number">
            <BsCaretLeftSquare
              onClick={this.onChangeLowestPage}
              test
              id="pagination-left-button"
            />
            <span data-testid="active-page-number">{activePage}</span> of 4
            <BsCaretRightSquare
              onClick={this.onChangeHighestPage}
              test
              id="pagination-right-button"
            />
          </p>
        </div>
      </div>
    )
  }

  renderLoadingPage = () => (
    <div className="loader-spinner" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  renderLoadingPageOfCarousels = () => (
    <div className="loader-spinner" testid="restaurants-offers-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  onRenderImagesPageView = () => {
    const {apiImagesStatus} = this.state
    switch (apiImagesStatus) {
      case apiStatusImages.success:
        return this.renderCarousels()
      case apiStatusImages.failure:
        return this.renderCarouselsFailurePage()
      case apiStatusImages.in_progress:
        return this.renderLoadingPageOfCarousels()
      default:
        return null
    }
  }

  onRenderPageView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
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
      <div className="home-container">
        <Header />
        <div className="resp-box">
          {this.onRenderImagesPageView()}
          {this.onRenderPageView()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default HomeRoute
