import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const RestaurantItem = props => {
  const {data} = props
  const {id, name, cuisine, userRating, imageUrl} = data
  const {rating, ratingColor, totalReviews} = userRating
  return (
    <Link
      to={`/restaurant/${id}`}
      className="link-item"
      testid="restaurant-item"
    >
      <li className="restaurant-item" testid="restaurant-item">
        <img
          src={imageUrl}
          alt="website logo"
          className="rest-image"
          data-testid="restaurant-item"
        />
        <div className="rest-details">
          <h1 className="rest-name">{name}</h1>
          <h3 className="rest-type">{cuisine}</h3>
          <div className="rating-box">
            <AiFillStar color={ratingColor} />
            <span className="rating">{rating}</span>
            <span className="total-ratings">{`(${totalReviews} ratings)`}</span>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
