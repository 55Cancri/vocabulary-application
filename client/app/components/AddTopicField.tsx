// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Link, RouteComponentProps } from 'react-router-dom'
// import fontawesome from '@fortawesome/fontawesome'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { generateUuid } from '../helpers/helpers';
// import { startSubmitTopic } from '../actions/app'

// interface IProps {
//   username?: string,
//   submitTopic?: any,
//   logging?: any
// }

// interface IState {
//   topic: string
// }

// export class AddTopicField extends Component<IProps, IState> {
//   state = {
//     topic: ''
//   }
//   //@ts-ignore
//   componentDidMount = () => console.log('Props in add topic field: ', this.props)

//   onFieldChange = e => {
//     // let value: string = e.target
//     // this.setState({topic: value} as any)
//     let {name, value}: {name: keyof IState; value: string } = e.target
//     this.setState({
//       [name]: value
//     } as any)
//   }

//   handleSubmit = e => {
//     e.preventDefault()
//     let name = this.state.topic
//     let id = generateUuid
//     let username = this.props.username
//     let nextTopic = {
//       uid: id,
//       username: username,
//       name: name
//     }
//     console.log('next topic ', nextTopic)
//     this.props.logging()
//     // console.log(startSubmitTopic)
//   }

//   render() {
//     const topic = this.state.topic
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}
//           onChange={this.onFieldChange} >
//           <input type="text" name="topic" value={topic} />
//           <button type="submit"
//             className="btn btn-primary btn-circle">
//             <FontAwesomeIcon icon="paper-plane" className="fa-paper-plane" />
//           </button>
//         </form>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({
//   username: state.auth.username
// })

// const mapDispatchToProps = dispatch => ({
//   // submitTopic: (topic) => startSubmitTopic(topic, dispatch)
//   logging: () => console.log('Printing'),
//   submitTopic: (topic) => console.log(startSubmitTopic(topic, dispatch))
// })


// const mapDispatchToProps = dispatch => ({
//   logging: () => console.log('hit log function')
// })


// export default connect<any>(mapStateToProps)(AddTopicField)
