import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const appLogo =
  'https://res.cloudinary.com/dtmvgpr2l/image/upload/v1699438448/Frame_274_vabwsk.png'
const loginImage =
  'https://res.cloudinary.com/dtmvgpr2l/image/upload/v1699437046/Rectangle_1456_1_cxibrl.jpg'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorMsg, isError, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.onSubmit}>
            <img src={appLogo} alt="website logo" className="app-logo" />
            <h1 className="app-title">Tasty Kitchens</h1>
            <h1 className="login-text">Login</h1>
            <div>
              <label className="form-label" htmlFor="USERNAME">
                USERNAME
              </label>
              <input
                type="text"
                className="form-input"
                id="USERNAME"
                value={username}
                onChange={this.onChangeUserName}
              />
              <label className="form-label" htmlFor="PASSWORD">
                PASSWORD
              </label>
              <input
                type="password"
                className="form-input"
                id="PASSWORD"
                value={password}
                onChange={this.onChangePassword}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {isError && <p className="login-err-msg">*{errorMsg}</p>}
            </div>
          </form>
        </div>
        <img src={loginImage} alt="website login" className="login-img" />
      </div>
    )
  }
}

export default LoginRoute
