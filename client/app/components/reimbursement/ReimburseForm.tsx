import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteProps } from 'react-router'
import ReimburseItem from './ReimburseItem'
import { generateUuid } from '../../helpers/helpers'
import { startSubmitReimbursement } from '../../actions/app'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

interface IProps extends RouteProps {
  role: string
  username: string
  startSubmitReimbursement?: any
  history?: any
}

export class ReimburseForm extends Component<IProps> {
  state = {
    items: [
      {
        uid: '',
        title: '',
        amount: '',
        description: '',
        receipts: [],
        timeOfExpense: 0,
        edited: false
      }
    ],
    type: 'lodging',
    prevIndex: null,
    errors: ''
  }

  handleSubmit = e => {
    e.preventDefault()

    const baseObj = {
      title: '',
      amount: '',
      description: '',
      timeOfExpense: 0
    }

    this.state.items.map(item => {
      let { uid, receipts, edited, ...essentials } = item
      if (JSON.stringify(essentials) === JSON.stringify(baseObj))
        return this.setState({ errors: 'Item(s) must not be blank' })
    })

    const { username, role, startSubmitReimbursement } = this.props
    const data = {
      items: this.state.items,
      type: this.state.type,
      username,
      role
    }

    startSubmitReimbursement(data).then(() =>
      this.props.history.push('/dashboard')
    )
  }

  handleTypeChange = ({ target }) => {
    this.setState({ type: target.value })
  }

  handleItemChange = ({ target }) => {
    const id = target.parentNode.id
    const index = target.parentNode.dataset.position
    const { prevIndex } = this.state
    const newItems = this.state.items.map(item => {
      // if passed id !== mapped item id, skip item
      if (id !== item.uid) return item

      // else apply changes
      switch (target.name) {
        case 'title':
          return {
            ...item,
            title: target.value,
            edited: true
          }
        case 'amount':
          return {
            ...item,
            amount: target.value.toString(),
            edited: true
          }
        case 'description':
          return {
            ...item,
            description: target.value,
            edited: true
          }
        case 'receipts':
          return {
            ...item,
            receipts: [...item.receipts, target.value],
            edited: true
          }
        default:
          return item
      }
    })
    this.setState({ items: newItems, prevIndex: index })
  }

  handleRemoveItem = (uuid?: string) => {
    // array of all elements
    const { items } = this.state

    // array of all elements except last
    const minusTerminal = items.slice(0, -1)
    console.log('full: ', items)
    console.log('without last: ', minusTerminal)

    if (uuid) {
      console.log('here is id: ', uuid)
      items.length > 1 &&
        this.setState({
          items: items.filter((item, i) => item.uid !== uuid)
        })
      return
    } else
      this.setState({
        items: minusTerminal
      })
  }

  handleAddItem = ({ target }) => {
    const { items, prevIndex } = this.state

    const index = target.parentNode.dataset.position
    const penultPosition = items[items.length - 2]
    const terminalPosition = items[items.length - 1]
    let penult

    // logs before changes are applied
    console.log('penult: ', penultPosition)
    console.log('terminal: ', terminalPosition)

    // create variable (terminal) with data of last object
    const { uid, receipts, edited, ...terminal } = terminalPosition

    // create variable (penult) with data of second to last object
    if (items.length > 1) {
      let {
        uid: uid2,
        receipts: receipts2,
        edited: edited2,
        ...necessary
      } = penultPosition

      // assign important properties to second last variable
      penult = necessary
    }

    const generateEmptyItem = () =>
      this.setState({
        items: [
          ...this.state.items,
          {
            uid: generateUuid(),
            title: '',
            amount: '',
            description: '',
            receipts: [],
            timeOfExpense: 0
          }
        ]
      })

    // comparison object
    const baseObj = {
      title: '',
      amount: '',
      description: '',
      timeOfExpense: 0
    }

    console.log(
      'second last = base: ',
      JSON.stringify(penult) === JSON.stringify(baseObj)
    )
    console.log(
      'last = base: ',
      JSON.stringify(terminal) === JSON.stringify(baseObj)
    )

    if (items.length === 1) return generateEmptyItem()

    // if editing field on same row, don't do anything
    // if (prevIndex !== index) return
    console.log('prev index: ', prevIndex, 'curr index: ', index)

    // if last object is not empty, generate empty field
    if (
      JSON.stringify(terminal) !== JSON.stringify(baseObj) &&
      prevIndex === index
    )
      return generateEmptyItem()

    if (
      JSON.stringify(penult) !== JSON.stringify(baseObj) &&
      index >= items.length - 1 &&
      index !== prevIndex
    )
      return generateEmptyItem()

    if (
      JSON.stringify(terminal) === JSON.stringify(baseObj) &&
      JSON.stringify(penult) === JSON.stringify(baseObj) &&
      // index <= items.length - 1 &&
      items.length > 2
    )
      return this.handleRemoveItem()
  }

  // @ts-ignore
  componentDidMount = () =>
    // initialize by generating unique id for each item
    this.state.items.forEach((item, i) => {
      const items = [...this.state.items]
      items[i].uid = generateUuid()

      this.setState({ items })
    })

  // @ts-ignore
  render = () => {
    const { items, errors, type } = this.state
    return (
      <form
        id="reimburse-form"
        onSubmit={this.handleSubmit}
        className="reimbursement-form"
      >
        <div className="type-header">
          <label htmlFor="type" className="type-label">
            type
          </label>
          <FontAwesomeIcon
            icon="angle-down"
            size="xs"
            className="fa-angle-down"
          />
          <select
            name="type"
            value={type}
            onChange={this.handleTypeChange}
            className="select-type"
          >
            <option value="lodging">lodging</option>
            <option value="travel">travel</option>
            <option value="food">food</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="reimbursement-labels">
          <label htmlFor="title">title</label>
          <label htmlFor="amount">amount</label>
          <label htmlFor="description">description</label>
          <label htmlFor="receipts">receipts</label>
        </div>
        <div />
        {this.state.items.map((item, i) => {
          return (
            <ReimburseItem
              key={item.uid}
              index={i}
              itemData={this.state.items[i]}
              handleAddItem={this.handleAddItem}
              handleRemoveItem={this.handleRemoveItem}
              handleItemChange={this.handleItemChange}
            />
          )
        })}
        {errors && <p>{errors}</p>}
      </form>
    )
  }
}

const mapDispatchToProps = state => ({
  username: state.auth.username,
  role: state.auth.role
})

export default connect(
  mapDispatchToProps,
  { startSubmitReimbursement }
)(ReimburseForm)
