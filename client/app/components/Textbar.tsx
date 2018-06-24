import React, { Component } from 'react'
import { connect } from 'react-redux'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

interface IProps {
  dataIsHere: boolean
  words: any
}

export class Textbar extends Component<IProps> {
  state = {
    numberOfTopics: 0
  }

  // @ts-ignore
  componentDidMount = () => {
    const { dataIsHere, words } = this.props
    if (dataIsHere) {
      const topics = words.map(word => word.topics)
      this.setState({
        numberOfTopics: topics.length
      })
    }
  }

  // @ts-ignore
  render = () => {
    const { numberOfTopics } = this.state
    return (
      <div className="textbar">
        <p>Topics</p>
        <p>{numberOfTopics} topics</p>
        <ul>
          <li>biology</li>
          <li>physics</li>
          <li>technology</li>
          <li>philosophy</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dataIsHere: !!state.app.dataIsHere,
  words: state.lexica.words
})

export default connect(mapStateToProps)(Textbar)
