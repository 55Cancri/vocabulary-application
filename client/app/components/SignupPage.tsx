import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { startSignup } from '../actions/auth'

// TODO: FINISH GTAV CHEAT CODE CHECK. IT ENABLES YOU TO CONTINUE ADDING
// WRONG LETTERS ON I THINK > AND < CHARACTERS. MAYBE OTHERS...

interface ClassProps extends RouteComponentProps<any> {
  startSignup(data: {}): any
}

interface ClassState {
  username: string
  email: string
  password: string
  cheat: any
  message: string
  admin: boolean
  errors: {
    username: string
    email: string
    password: string
  }
}

export class SignupPage extends Component<ClassProps, ClassState> {
  state = {
    email: '',
    fullname: '',
    username: '',
    password: '',
    cheat: [],
    message: '',
    admin: false,
    errors: {
      username: '',
      email: '',
      password: '',
      global: ''
    }
  }

  promiseState = async state =>
    new Promise(resolve => this.setState(state, resolve))

  // promiseState({...})
  //     .then(() => promiseState({...})
  //     .then(() => {
  //         ...  // other code
  //         return promiseState({...});
  //     })
  //     .then(() => {...});

  // accessibility
  listenKeyboard = e => {
    // gta v cheat code
    const code = ['>', 'a', '>', '<', '>', 'rb', '>', '<', 'a', 'y']
    const { cheat: command } = this.state

    const checkmark: any = wrong => {
      if (wrong) return console.clear()
      else console.log(`%c✓`, `color: springgreen; font-size: 24px`)
    }

    // check every button on keypress
    switch (e.keyCode || e.key) {
      case 37:
        if (command[2] === '>' || command[6] === '>')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, '<']
          }))
            .then(() => test())
            .then(() => checkmark())
        else this.promiseState({ cheat: [] }).then(() => checkmark('wrong'))
        break
      case 39:
        if (
          command.length === 0 ||
          command[1] === 'a' ||
          command[3] === '<' ||
          command[5] === 'rb'
        )
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, '>']
          }))
            .then(() => test())
            .then(() => checkmark())
        else
          this.promiseState({ cheat: [] })
            .then(() => test())
            .then(() => checkmark('wrong'))
        break
      case 9:
      case 'Tab':
        if (command[4] === '>')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, 'rb']
          }))
            .then(() => test())
            .then(() => checkmark())
        else
          this.promiseState({ cheat: [] })
            .then(() => test())
            .then(() => checkmark('wrong'))
        break
      case 65:
      case 'a':
        if (command[0] === '>' || command[7] === '<')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, 'a']
          }))
            .then(() => test())
            .then(() => checkmark())
        else
          this.promiseState({ cheat: [] })
            .then(() => test())
            .then(() => checkmark('wrong'))
        break
      case 89:
      case 'y':
        if (command[8] === 'a')
          this.promiseState(prevState => ({
            ...prevState,
            cheat: [...prevState.cheat, 'y']
          }))
            .then(() => test())
            .then(() => checkmark())
        else
          this.promiseState({ cheat: [] })
            .then(() => test())
            .then(() => checkmark('wrong'))
        break
      default:
        this.promiseState({ cheat: [] }).then(() => test())
    }

    if (this.state.cheat.length > 10) this.promiseState({ cheat: [] })
    const test = () => {
      if (this.state.cheat.join(',') === code.join(',')) {
        this.promiseState({
          admin: true,
          message: 'You can now sign in as an admin!'
        }).then(() => console.log('God Mode: active'))
        window.removeEventListener('keydown', this.listenKeyboard, true)
      }
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.listenKeyboard, true)
  }

  // prevent memory leaks
  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenKeyboard, true)
  }

  onFieldChange = ({ target }) => {
    const { name, value } = target
    this.setState({
      [name]: value
    } as any)
  }

  // startSignup will also have dispatch with it
  onSubmit = e => {
    e.preventDefault()
    const personName = this.state.fullname.split(' ')

    const { email, username, password, admin } = this.state

    const data = {
      email: this.state.email,
      firstname: personName[0],
      lastname: personName[personName.length - 1],
      username: this.state.username,
      password: this.state.password,
      role: admin ? 'admin' : 'employee'
    }

    // passed down from connect
    this.props
      .startSignup(data)
      .then(() => {
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        console.log('Error on submit in signup page: ', err)
        this.setState({ errors: err.response.data.errors })
      })
  }

  render() {
    const { errors, admin, message } = this.state
    return (
      <div className="signup-page">
        {admin && (
          <img
            src="https://png.icons8.com/color/160/crown.png"
            style={{
              margin: '0 auto',
              width: '100px',
              height: '100px',
              filter: 'brightness(110%)'
            }}
          />
        )}
        <div className="signup-bg" />
        <form
          autoComplete="off"
          className="signup-form"
          onChange={this.onFieldChange}
          onSubmit={this.onSubmit}
        >
          <div className="input-group">
            <label htmlFor="email" className="title">
              email
            </label>
            <input type="email" name="email" />
          </div>
          <div className="input-group">
            <label htmlFor="fullname" className="title">
              full name
            </label>
            <input type="text" name="fullname" />
          </div>
          <div className="input-group">
            <label htmlFor="username" className="title">
              username
            </label>
            <input type="text" name="username" />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="title">
              password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
            />
          </div>
          <div className="input-group">
            <button type="submit" className="signup-button button">
              Signup
            </button>
          </div>
          <div className="switch-auth-form">
            <p className="text">Already have an account?</p>
            <Link to="/login" className="login-link">
              &nbsp;Login
            </Link>
          </div>
        </form>
        {!!errors.global && <p>{errors.global}</p>}
        {message && <div className="message">{message}</div>}
        <div className="signup-overlay" />
        <div className="signup-bg" />
      </div>
    )
  }
}

export default connect(
  undefined,
  { startSignup }
)(SignupPage)
