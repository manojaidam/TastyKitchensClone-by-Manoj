import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {IoIosCloseCircle, IoMdClose} from 'react-icons/io'
import './index.css'

class Header extends Component {
  //   state = {
  //     menuOpen: false,
  //   }

  //   onToggleMenu = () => {
  //     this.setState(prev => ({menuOpen: !prev.menuOpen}))
  //   }

  //   closeMenu = () => {
  //     this.setState({menuOpen: false})
  //   }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="responsive-box">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '280px',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/" className="link-item">
              <img
                src="https://res.cloudinary.com/dtmvgpr2l/image/upload/v1699438448/Frame_274_vabwsk.png"
                alt="website logo"
                className="app-logo"
              />
            </Link>
            <h1 className="app-title">Tasty Kitchens</h1>
          </div>

          <div className="menu-list-box">
            <ul className="nav-list">
              <Link to="/" className="link-item">
                <li className="nav-link">Home</li>
              </Link>
              <Link to="/cart" className="link-item">
                <li className="nav-link">Cart</li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-btn"
              onClick={this.onLogout}
            >
              Logout
            </button>
            {/* <Popup
              modal
              className="popup-content"
              trigger={
                <button type="button" className="logout-btn">
                  Logout
                </button>
              }
            >
              {close => (
                <div className="logout-popup-box">
                  <h2 className="are-you-sure-text">
                    Are you sure you want to Logout?
                  </h2>
                  <div className="buttons-box">
                    <button
                      type="button"
                      className="btn cancel"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn confirm"
                      onClick={this.onLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup> */}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
